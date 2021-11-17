<template>
  <b-modal
    :id="'modal-create'"
    hide-footer
    centered
    title="Crear elemento personalizado"
  >
    <form @submit="createCustom" @submit.prevent>
      <div class="modal-body">
        <div class="input-group mb-2">
          <label class="input-group-text w-25 text-wrap text-start">Nombre</label>
          <input class="form-control" type="text" required v-model="form.name" />
        </div>
        <div class="input-group mb-2">
          <label class="input-group-text w-25 text-wrap text-start" for="">Descripción</label>
          <textarea class="form-control"
            name="textarea" rows="5" cols="35"
            v-model="form.description" required>
          </textarea>
        </div>
        <div class="input-group mb-2">
          <label class="input-group-text w-25 text-wrap text-start" for="">Alto (%)</label>
          <input class="form-control" type="number" min="1" max="100" required v-model="form.defaultHeight"/>
        </div>
        <div class="input-group mb-2">
          <label class="input-group-text w-25 text-wrap text-start" for="">Ancho (%)</label>
          <input class="form-control" type="number" min="1" max="100" required v-model="form.defaultWidth"/>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          @click="$bvModal.hide('modal-create')"
          class="btn btn-secundary"
        >
          Cerrar
        </button>
        <button type="submit" class="btn btn-primary">
          Crear elemento personalizado
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ModalCreate",
  data: function () {
    return {
      form: {
        name: "",
        description: "",
        projectId: "",
        defaultWidth: 1,
        defaultHeight: 1,
        childComponents: [],
      },
    };
  },
  methods: {
    ...mapActions({
      createElement: "element/createCustomComponent",
    }),
    async createCustom() {
      this.form.projectId = this.$route.params.projectId;
      let formInfo = { ...this.form };
      formInfo.defaultWidth = parseFloat(formInfo.defaultWidth);
      formInfo.defaultHeight = parseFloat(formInfo.defaultHeight);
      await this.createElement(formInfo);
      this.resetForm();
      this.$bvModal.hide("modal-create");
    },
    resetForm() {
      this.form.name = "";
      this.form.description = "";
      this.form.projectId = "";
      this.form.defaultWidth = 1;
      this.form.defaultHeight = 1;
      this.form.childComponents = [];
    },
  },
};
</script>

<style scoped>

</style>
