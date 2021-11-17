<template>
  <div >
    <b-modal :id="'ModalDeletePage'+page._id" hide-footer centered title="Eliminar Pagina">
      <form @submit="deletePage" @submit.prevent>
        <div class="modal-body">
          <p>
            ¿Esta seguro en eliminar la pagina
            {{ page.name }} ?
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="$bvModal.hide('ModalDeletePage'+page._id)" class="btn btn-secundary">
            Cerrar
          </button>
          <button type="submit" class="btn btn-danger">
            Eliminar pagina
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script >

import { mapActions } from "vuex";
export default {
  name: "ModalDeletePage",
  props: ["page", "section"],
  methods: {
    ...mapActions({
      dropPage: "project/delete_page",
    }),
    async deletePage() {
      let payload ={
        idProject: this.project._id, 
        idSection: this.section._id, 
        idPage: this.page._id
      }
      await this.dropPage(payload);
      this.$emit('update-project')
      this.$bvModal.hide('ModalDeletePage'+this.page._id);
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
