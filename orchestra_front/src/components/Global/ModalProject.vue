<template>
  <div >
    <b-modal :id="'Modal'+name" hide-footer centered title="Nuevo Proyecto">
      <form @submit="createProject" @submit.prevent>
        <div class="modal-body">
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
          <div class="input-group mb-2">
              <label class="input-group-text w-25" for="">Organización</label>
              <select class="form-select" v-model="form.organizationId" required>
                  <option value="">Seleccione la organización</option>
                  <option v-for="organization of organizations" :key="organization._id" :value="organization._id">
                      {{organization.name}}
                  </option>
              </select>
          </div>
        </div>
        <div v-if="loading">
          Se esta creando el proyecto, por favor espere...
        </div>
        <div class="modal-footer">
          <button
            @click="$bvModal.hide('Modal'+name)"
             class="btn btn-secundary"
          >
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">Crear Proyecto</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script >

import { mapActions } from "vuex";
export default {
  name: "ModalProject",
  props: ["name", "template"],
  data: function () {
    return {
      form: {
        name: "",
        description: "",
        organizationId: "",
      },
      loading: false,
    };
  },
  mounted() {
      this.$store.dispatch('project/getOrganizations');
  },
  methods: {
    ...mapActions({
      createProj: "project/createProject",
      createProjTemp: "project/createProjectTemplate",
    }),
    async createProject() {
      let form = { ...this.form }
      if(this.template){
        this.loading = true;
        let payload = {
          idTemplate: this.name, 
          project : form
        }
        await this.createProjTemp(payload)
        this.loading = false;
      }else{
        await this.createProj(form);
      }
      await this.$store.dispatch("project/getUserProject");
      this.form.name = ""
      this.form.description = ""
      this.$bvModal.hide('Modal'+this.name)
    },
  },
  computed: {
    user() {
      let user = this.$store.getters["session/user"];
      return user;
    },
    organizations(){
      return (this.$store.state.project.organizations || [])
    }
  },
}
;
</script>


<style scoped>

</style>
