<template>
  <div>
    <b-modal :id="'delete-layer'+element._id" hide-footer centered title="Eliminar Capa">
      <form @submit="deleteElement" @submit.prevent>
        <div class="modal-body">
          <p>
            ¿Esta seguro en eliminar la capa 
            {{ element.title }} 
            ?
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="$bvModal.hide('delete-layer'+element._id)" class="btn btn-secundary">
            Cerrar
          </button>
          <button type="submit" class="btn btn-danger">
            Eliminar capa
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
  props: ['element'],
  methods: {
    ...mapActions({
      removeElement: "element/deleteElement",
    }),
    async deleteElement() {
      const payload = {
          idProject: this.$route.params.projectId,
          idPage: this.$route.params.pageId,
          idElement: this.element._id
      }
      await this.removeElement(payload);
      this.$bvModal.hide('delete-layer'+this.element._id);
    },
  }
});
</script>


<style>
</style>
