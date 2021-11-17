<template>
  <b-modal :id="'delete-custom'+element._id" hide-footer centered title="Eliminar elemento personalizado">
      <form @submit="deleteElement" @submit.prevent>
        <div class="modal-body">
          <p>
            ¿Esta seguro en eliminar el elemento personalizado?
            <br/>
            {{ element.name }} 
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="$bvModal.hide('delete-custom'+element._id)" class="btn btn-secundary">
            Cerrar
          </button>
          <button type="submit" class="btn btn-danger">
            Eliminar texto
          </button>
        </div>
      </form>
    </b-modal>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: 'ModalDelete',
    props: ['element'],
    methods: {
        ...mapActions({
        removeElement: "element/deleteCustomComponent",
    }),
    async deleteElement() {
      await this.removeElement(this.element);
      this.$bvModal.hide('delete-custom'+this.element._id);
    },
  }
}
</script>

<style scoped>

</style>