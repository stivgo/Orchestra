<template>
  <div >
    <b-modal :id="'ModalEditProject'+project._id" hide-footer centered title="Editar Información del proyecto">
      <form @submit="updateProject" @submit.prevent>
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
        </div>
        <div class="modal-footer">
          <button
            @click="$bvModal.hide('ModalEditProject'+project._id)"
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
  name: "ModalEditProject",
  props: ["project"],
  data: function () {
    return {
      form: {
        name: this.project.name,
        description: this.project.description,
        _id: this.project._id,
        version: this.project.version + 1
      },
      modalShow: true,
    };
  },
  methods: {
    ...mapActions({
      updateProj: "project/updateProject",
    }),
    async updateProject() {
      await this.updateProj(this.form);
      this.$emit('update-project')
      this.$bvModal.hide('ModalEditProject'+this.project._id)
    },
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
