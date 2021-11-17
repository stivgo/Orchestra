<template>
  <div >
    <b-modal :id="'ModalEditPage'+page._id" hide-footer centered title="Editar Información del proyecto">
     <form @submit="updatePage" @submit.prevent>
        <div class="modal-body">
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Nombre</label>
            <input class="form-control" type="text" required v-model="page.name" />
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start" for="">Descripción</label>
            <textarea class="form-control"
              name="textarea" rows="5" cols="35"
              v-model="page.description" required
            >
            </textarea>
          </div>
          <!-- 
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Número</label>
            <input class="form-control" type="number" required v-model="form.number" min="1" />
          </div>
          <div class="input-group mb-2">
            <label class="mb-2 form-label w-50">Tiempo de inicio<input class="form-control" type="number" required v-model="form.startTime"  min="0"/></label>
            <label class="mb-2 form-label w-50"> Tiempo de fin<input class="form-control" type="number" required v-model="form.endTime" min="0" /></label>
          </div>
           -->
           <div class="input-group mb-2">
            <label class="mb-2 form-label w-50"> Duración<input class="form-control" type="text" required v-model="time" pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{3}" placeholder="HH:MM:SS:sss" /> Formato: HH:MM:SS:sss</label>
          </div>
        </div>
        
        <div class="modal-footer">
          <button
            @click="$bvModal.hide('ModalInsertPage'+section._id)"
             class="btn btn-secundary"
          >
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">Actualizar Pagina</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script >

import { mapActions } from "vuex";
import {convertTimeElement} from '@/utils/utils'
export default {
  name: "ModalEditPage",
  props: ["page", "section"],
  data: function () {
    return {
      time: "",
      modalShow: true,
    };
  },
   mounted(){
    this.convertTime()
  },
  methods: {
    ...mapActions({
      editPage: "project/update_page",
    }),
    async updatePage() {
      let endTime  = this.time.split(":")
      let time  = parseFloat(endTime[0])*3600 + parseFloat(endTime[1])*60 + parseFloat(endTime[2])
      time*=1000
      time= parseFloat(endTime[3])===0 ? time: time + parseFloat(endTime[3])
      this.page.endTime = time
      let payload = {
        idProject:  this.$route.params.id, 
        idSection: this.section._id, 
        page: this.page
      }
      await this.editPage(payload);
      this.$emit('update-project')
      this.$bvModal.hide('ModalEditPage'+this.page._id)
    },
    convertTime(){
     this.time = convertTimeElement(this.page.endTime)
    }
  },
  computed: {
    user() {
      let user = this.$store.getters["session/user"];
      return user;
    },
  },
}
;
</script>


<style scoped>
input {
  border: 1px black solid;
}
textarea {
  resize: none;
  border: 1px black solid;
  padding: 1%;
}
</style>
