<template>
  <div>
    <b-modal :id="'delete-image'+(element.indexS?element.indexS:element._id)" hide-footer centered title="Eliminar Imagen">
      <form @submit="deleteElement" @submit.prevent>
        <div class="modal-body">
          <p>
            ¿Esta seguro en eliminar la imagen?
            <br/>
            {{ element.title }} 
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="$bvModal.hide('delete-image'+(element.indexS?element.indexS:element._id))" class="btn btn-secundary">
            Cerrar
          </button>
          <button type="submit" class="btn btn-danger">
            Eliminar Imagen
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
  props: ['element', 'custom', 'index', 'customElement'],
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
      if(this.custom){
          let payload =  {...this.customElement}
          payload.childComponents.splice(this.index, 1);
          this.$store.dispatch('element/updateElementCustomSize', payload);
        }else{
          await this.removeElement(payload);
        }
      this.$bvModal.hide('delete-image'+(this.element.indexS?this.element.indexS:this.element._id));
    },
  }
});
</script>


<style>
</style>
