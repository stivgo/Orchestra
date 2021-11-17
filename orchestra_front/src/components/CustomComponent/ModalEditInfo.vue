<template>
  <b-modal
    :id="'edit-info'+element._id"
    hide-footer
    centered
    title="Editar información"
  >
    <form @submit="updateCustom" @submit.prevent>
      <div class="modal-body">
        <div class="input-group mb-2">
          <label class="input-group-text w-25 text-wrap text-start">Nombre</label>
          <input class="form-control" type="text" required v-model="element.name" />
        </div>
        <div class="input-group mb-2">
          <label class="input-group-text w-25 text-wrap text-start" for="">Descripción</label>
          <textarea class="form-control"
            name="textarea" rows="5" cols="35" 
            v-model="element.description" required>
          </textarea>
        </div>
        <div class="input-group mb-2">
          <label class="input-group-text w-25 text-wrap text-start" for="">Alto (%)</label>
          <input class="form-control" type="number" min="1" max="100" required v-model="element.defaultHeight"/>
        </div>
        <div class="input-group mb-2">
          <label class="input-group-text w-25 text-wrap text-start" for="">Ancho (%)</label>
          <input class="form-control" type="number" min="1" max="100" required v-model="element.defaultWidth"/>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          @click="$bvModal.hide('edit-info' + element._id)"
          class="btn btn-secundary"
        >
          Cerrar
        </button>
        <button type="submit" class="btn btn-primary">
          Editar información
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ModalEditInfo",
  data: function () {
    return {
      
    };
  },
  props: ["element"],
  methods: {
    ...mapActions({
      updateElement: "element/updateCustomComponent",
    }),
    async updateCustom() {
      this.element.defaultWidth = parseFloat(this.element.defaultWidth);
      this.element.defaultHeight = parseFloat(this.element.defaultHeight);
      await this.updateElement(this.element);
      this.$bvModal.hide('edit-info' + this.element._id);
    },
  },
};
</script>

<style scoped>

</style>
