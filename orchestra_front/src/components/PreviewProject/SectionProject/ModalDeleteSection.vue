<template>
  <div >
    <b-modal :id="'ModalDeleteSection'+section._id" hide-footer centered title="Eliminar sección">
      <form @submit="deleteSection" @submit.prevent>
        <div class="modal-body">
          <p>
            ¿Esta seguro en eliminar la sección
            {{ section.name }} ?
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="$bvModal.hide('ModalDeleteSection'+section._id)" class="btn btn-secundary">
            Cerrar
          </button>
          <button type="submit" class="btn btn-danger">
            Eliminar sección
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script >

import { mapActions } from "vuex";
export default {
  name: "ModalDeleteSection",
  props: ["section"],
  methods: {
    ...mapActions({
      deleteProj: "project/delete_section",
    }),
    async deleteSection() {
      let payload = {
        idProject: this.project._id,
        idSection: this.section._id
        }
      await this.deleteProj(payload);
      this.$emit('update-project')
      this.$bvModal.hide('ModalDeleteSection'+this.section._id);
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
input {
  border: 1px black solid;
}
textarea {
  resize: none;
  border: 1px black solid;
  padding: 1%;
}
</style>
