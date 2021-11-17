<template>
  <div >
    <b-modal :id="'ModalInsertSection'+project._id" hide-footer centered title="Insertar nueva sección">
      <form @submit="createSection" @submit.prevent>
        <div class="modal-body">
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Nombre</label>
            <input class="form-control" type="text" required v-model="form.name" />
          </div>
          <!-- <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Número</label>
            <input class="form-control" type="number" required v-model="form.number" min="1" />
          </div>
          <div class="input-group mb-2">
            <label class="mb-2 form-label w-50"> Tiempo de inicio
              <input class="form-control" type="number" required v-model="form.startTime" min="0" />
            </label>
            <label class="mb-2 form-label w-50"> Tiempo de fin
             <input class="form-control" type="number" required v-model="form.endTime" min="0" />
            </label>
          </div>
          -->
        </div>
        <div class="modal-footer">
          <button
            @click="$bvModal.hide('ModalInsertSection'+project._id)"
             class="btn btn-secundary"
          >
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">Crear sección</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script >

import { mapActions } from "vuex";
export default {
  name: "ModalInsertSection",
  props: ["project"],
  data: function () {
    return {
      form: {
        name: "",
        number: 0,
        startTime: 0,
        endTime: 0
      },
      modalShow: true,
    };
  },

  methods: {
    ...mapActions({
      insertSection: "project/create_section",
    }),
    async createSection() {
      let form = {...this.form}
      form.number = parseFloat(form.number)
      form.startTime = parseFloat(form.startTime)
      form.endTime = parseFloat(form.endTime)
      let payload = {
        idProject: this.project._id,
        sectionData : form
      }
      this.resetForm()
      await this.insertSection(payload);
      this.$emit('update-project')
      this.$bvModal.hide('ModalInsertSection'+this.project._id)
    },
    resetForm(){
      this.form.name = ""
      this.form.number = 0
      this.form.startTime = 0
      this.form.endTime = 0
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

</style>
