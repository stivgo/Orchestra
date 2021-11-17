<template>
  <div v-if="project !== undefined">
    <b-modal :id="'ModalDelete'+project._id" hide-footer centered title="Eliminar Proyecto">
      <form @submit="deleteProject" @submit.prevent>
        <div class="modal-body">
          <p v-if="project !== undefined">
            ¿Esta seguro en eliminar el proyecto
            {{ project.name }} ?
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="$bvModal.hide('ModalDelete'+project._id)" class="btn btn-secundary">
            Cerrar
          </button>
          <button type="submit" class="btn btn-danger">
            Eliminar Proyecto
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
export default Vue.extend({
  name: 'ModalDelete',
  props: ['project'],
  methods: {
    ...mapActions({
      deleteProj: "project/delete_project",
    }),
    async deleteProject() {
      await this.deleteProj(this.project._id);
      await this.$store.dispatch("project/getUserProject");
      this.$bvModal.hide("ModalDelete"+this.project._id);
    },
  }
});
</script>


<style>
</style>
