<template>
  <b-modal :id="'Template'+name._id" hide-footer centered title="Crear plantilla de proyecto">
      <form @submit="createProject" @submit.prevent>
        <div class="modal-body">
            <h3>Creando plantilla de : {{name.name}}</h3>
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
            @click="$bvModal.hide('Template'+name._id)"
             class="btn btn-secundary" type="button"
          >
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">Crear Plantilla</button>
        </div>
      </form>
    </b-modal>
</template>
<script>

import { mapActions } from "vuex";
export default {
  name: "ModalTemplate",
  props: ["name"],
  data: function () {
    return {
      form: {
        name: "",
        description: "",
        creator: "",
        projectId: "",
      },
    };
  },
  methods: {
    ...mapActions({
      createProj: "project/createTemplate",
    }),
    async createProject() {
      this.form.projectId = this.name._id;
      this.form.creator = this.user._id
      let form = { ...this.form }
      await this.createProj(form);
      this.form.name = ""
      this.form.description = ""
      this.form.creator = ""
      this.form.projectId = ""
      this.$bvModal.hide('Template'+this.name._id)
    },
  },
  computed: {
    user() {
      let user = this.$store.getters["session/user"];
      console.log(user);
      return user;
    }
  },
}
;
</script>


<style scoped>

</style>
