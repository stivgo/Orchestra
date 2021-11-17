<template>
  <div>
    <b-modal :id="'delete-button'+(element.indexS?element.indexS:element._id)" hide-footer centered title="Eliminar Boton">
      <form @submit="deleteElement" @submit.prevent>
        <div class="modal-body">
          <p>
            ¿Esta seguro que desea eliminar el botón?
            <br/>
            {{ element.content }} 
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="$bvModal.hide('delete-button'+(element.indexS?element.indexS:element._id))" class="btn btn-secundary">
            Cerrar
          </button>
          <button type="submit" class="btn btn-danger">
            Eliminar boton
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
  name: 'DeleteButton',
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
      this.$bvModal.hide('delete-button'+(this.element.indexS?this.element.indexS:this.element._id));
    },
  }
});
</script>


<style>
</style>
