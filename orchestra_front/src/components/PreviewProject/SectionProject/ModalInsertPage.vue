<template>
  <div >
    <b-modal :id="'ModalInsertPage'+section._id" hide-footer centered title="Nueva Página">
      <form @submit="createPage" @submit.prevent>
        <div class="modal-body">
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Nombre</label>
            <input class="form-control" type="text" required v-model="form.name" />
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start" for="">Descripción</label>
            <textarea class="form-control"
              name="textarea" rows="5" cols="35"
              v-model="form.description" required
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
            <label class="mb-2 form-label w-50"> Duración<input class="form-control" type="text" required v-model="form.endTime" pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{3}" placeholder="HH:MM:SS:sss" /></label>
          </div>
        </div>
        
        <div class="modal-footer">
          <button
            @click="$bvModal.hide('ModalInsertPage'+section._id)"
             class="btn btn-secundary"
          >
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">Crear Pagina</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script >

import { mapActions } from "vuex";
export default {
  name: "ModalInsertPage",
  props: ["section"],
  data: function () {
    return {
      form: {
        name: "",
        description: "",
        number: 0,
        startTime: 0,
        endTime: "00:00:00:000"
      },
      modalShow: true,
    };
  },
  methods: {
    ...mapActions({
      insertPage: "project/create_page",
    }),
    async createPage() {
      let form = {...this.form}
      form.number = parseFloat(form.number)
      form.startTime = parseFloat(form.startTime)

      let endTime  = form.endTime.split(":")
      let time  = parseFloat(endTime[0])*3600 + parseFloat(endTime[1])*60 + parseFloat(endTime[2])
      time*=1000
      time= parseFloat(endTime[3])===0 ? time: time + parseFloat(endTime[3])
      form.endTime = time
      let payload = {
        idProject: this.project._id, 
        idSection: this.section._id, 
        page: form
      }
      await this.insertPage(payload);
      this.resetForm()
      this.$emit('update-project')
      this.$bvModal.hide('ModalInsertPage'+this.section._id)
    },
    resetForm(){
      this.form.name= ""
      this.form.description= ""
      this.form.number= 0
      this.form.startTime= 0
      this.form.endTime= "00:00:00:000"
    }
  },
  computed: {
    user() {
      let user = this.$store.getters["session/user"];
      return user;
    },
    project() {
      return this.$store.state.project.project;
    }
  },
}
;
</script>


<style scoped>

</style>
