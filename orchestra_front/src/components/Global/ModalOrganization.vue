<template>
  <div >
    <b-modal :id="'Modal'+name" hide-footer centered title="Nueva organización">
      <form @submit="createOrganization" @submit.prevent>
        <div class="modal-body">
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Nombre</label>
            <input class="form-control" type="text" required v-model="form.name" />
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">NIT</label>
            <input class="form-control" type="text" required v-model="form.nit" />
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Sitio Web</label>
            <input class="form-control" type="text" required v-model="form.website" />
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">País</label>
            <input class="form-control" type="text" required v-model="form.country" />
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Número Telefónico</label>
            <input class="form-control" type="text" required v-model="form.phoneNumber" />
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Facebook</label>
            <input class="form-control" type="text" required v-model="form.facebookUrl" />
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Twitter</label>
            <input class="form-control" type="text" required v-model="form.twitterUrl" />
          </div>

        </div>
        <div class="modal-footer">
          <button
            @click="$bvModal.hide('Modal'+name)"
             class="btn btn-secundary" type="button"
          >
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">Crear Organización</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script >

import { mapActions } from "vuex";
export default {
  name: "ModalOrganization",
  props: ["name"],
  data: function () {
    return {
      form: {
        name: "",
        nit: "",
        website: "",
        country: "",
        phoneNumber: "",
        facebookUrl: ""
      },
      modalShow: true,
    };
  },
  methods: {
    ...mapActions({
      createOrg: "session/createOrganization",
    }),
    async createOrganization() {
      let form = {...this.form}
      await this.createOrg(form);
      this.form.name = ""
      this.form.nit = ""
      this.form.website = ""
      this.form.country = ""
      this.form.phoneNumber = ""
      this.form.facebookUrl = ""
      this.form.twitterUrl = ""
      this.$bvModal.hide('Modal'+this.name)
    },
  },
  computed: {
    user() {
      let user = this.$store.getters["session/user"];
      return user;
    },
  },
}
;
</script>


<style scoped>

</style>
