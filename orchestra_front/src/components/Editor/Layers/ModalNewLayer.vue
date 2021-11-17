<template>
  <div>
    <b-modal :id="'new-layer'" hide-footer centered title="Crear nueva capa">
      <form @submit="createLayer" @submit.prevent>
        <div class="modal-body">
          
          <div class="input-group mb-2">
              <label class="input-group-text w-25"> Titulo</label>
              <input class="form-control" type="text" required v-model="form.title" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="$bvModal.hide('new-layer')" class="btn btn-secundary">
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">
            Crear capa
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
  name: 'ModalNewLayer',
  props: ['element'],
  data: function () {
    return {
      form: {
        pageId: "",
        parentId: "",
        type: "Layer",
        title: "",
        description: "",
        xPosition: 0,
        yPosition: 0,
        zPosition: 1,
        width: 1,
        height: 1,
        startTime: 0,
        endTime: 0,
        isSelected: true,
        isActive: true,
        isVisible: true,
        isLocked: false,
        events: [],
        styles: [{
            property: "",
            value: ""
        }],
      },
      modalShow: true,
    };
  },
  methods: {
    ...mapActions({
      newLayer: "element/createElement",
    }),
    async createLayer() {
      let container = this.$store.state.element.elements[0]
      this.form.parentId = container._id
      this.form.zPosition = (container.childElements.length + 1) * 1000 
      this.form.pageId = this.$route.params.pageId
      let formInfo = {...this.form}
      let payload = {
          idProject: this.$route.params.projectId,
          element: formInfo
      }
      await this.newLayer(payload);
      this.resetForm()
      this.$bvModal.hide('new-layer')
    },
    resetForm(){
        this.form.pageId= ""
        this.form.type= "Layer"
        this.form.parentId= ""
        this.form.title= ""
        this.form.description= ""
        this.form.xPosition= 0
        this.form.yPosition= 0
        this.form.zPosition= 1
        this.form.width= 0
        this.form.height= 0
        this.form.startTime= 0
        this.form.endTime= 0
        this.form.isSelected= true
        this.form.isActive= true
        this.form.isVisible= true
        this.form.isLocked= false
        this.form.events= []
        this.form.styles= [{
            property: "",
            value: ""
        }]
    },
  }
});
</script>


<style>
</style>
