<template>
  <div >
    <b-modal :id="'ModalEditSection'+section._id" hide-footer centered title="Editar información de la sección">
      <form @submit="updateSection" @submit.prevent>
        <div class="modal-body">
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start" >Nombre</label>
            <input class="form-control" type="text" required v-model="form.name" />
          </div>
          <!-- 
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Número</label>
            <input class="form-control" type="number" required v-model="form.number" min="1" />
          </div>
          <div class="input-group mb-2">
            <label class="mb-2 form-label w-50">Tiempo de inicio
              <input class="form-control" type="number" required v-model="form.startTime" min="0" />
            </label>
            <label class="mb-2 form-label w-50">Tiempo de fin
              <input class="form-control" type="number" required v-model="form.endTime" min="0" />
            </label>
          </div>
           -->
        </div>
        <div class="modal-footer">
          <button
            @click="$bvModal.hide('ModalEditSection'+section._id)"
             class="btn btn-secundary"
          >
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">Editar Proyecto</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script >

import { mapActions } from "vuex";
export default {
  name: "ModalEditSection",
  props: ["section"],
  data: function () {
    return {
      form: {
        name: this.section.name,
        number: this.section.number,
        startTime: this.section.startTime,
        endTime: this.section.endTime,
        _id: this.section._id
      },
      modalShow: true,
    };
  },
  
  methods: {
    ...mapActions({
      updateSect: "project/update_section",
    }),
    async updateSection() {
      let form = {...this.form}
      form.number = parseFloat(form.number)
      form.startTime = parseFloat(form.startTime)
      form.endTime = parseFloat(form.endTime)
      let payload = {
        idProject: this.project._id,
        sectionData : form
      }
      await this.updateSect(payload);
      this.$emit('update-project')
      this.$bvModal.hide('ModalEditSection'+this.section._id)
    },
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