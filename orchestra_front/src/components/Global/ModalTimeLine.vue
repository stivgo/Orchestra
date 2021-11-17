<template>
  <b-modal
    :id="'insert-element-time'+element._id"
    hide-footer
    centered
    title="Agregar elemento a la linea de tiempo"
  >
    <form class="row g-3" @submit="createText" @submit.prevent>
      <div class="modal-body">
         <div class="input-group mb-2">
          <label class="input-group-text w-25"> Duración</label>
          <input class="form-control" type="text" required v-model="duration" pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{3}" placeholder="HH:MM:SS:sss" />
          </div>
      </div>
      <div class="modal-footer">
        <button
          @click="$bvModal.hide('insert-element-time'+element._id)"
          class="btn btn-secundary" type="button"
        >
          Cerrar
        </button>
        <button type="submit" class="btn btn-primary">Añadir elemento a linea del tiempo</button>
      </div>
    </form>
  </b-modal>
</template>

<script >
import { mapActions } from "vuex";
export default {
  name: "ModalTimeLine",
  data: function () {
    return {
      duration: "",
    };
  },
  props: ["element"],
  methods: {
    ...mapActions({
      addElement: "element/createTimeLine",
    }),
    async createText() {
      let pageId = this.$route.params.pageId;
      let projectId = this.$route.params.projectId;
      let endTime  = this.duration.split(":")
      let time  = parseFloat(endTime[0])*3600 + parseFloat(endTime[1])*60 + parseFloat(endTime[2])
      time*=1000
      time= parseFloat(endTime[3])===0 ? time: time + parseFloat(endTime[3])
      let formInfo = {
          _id: this.element._id,
          startTime: 0,
          endTime: time,
          title: this.element.title
      }
      let payload = {
        pageId: pageId,
        element: formInfo,
        idProject: projectId
      };
      await this.addElement(payload);
      this.resetForm();
      this.$bvModal.hide("insert-element-time"+this.element._id);
    },
    resetForm() {
      this.duration = "";
    },
  },

  computed: {
    project() {
      return this.$store.state.project.project;
    },
  },
};
</script>


<style scoped>
</style>
