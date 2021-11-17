<template>
  <div >
    <b-modal :id="'insert-image'" hide-footer centered title="Nueva Imagen">
      <form @submit="createImage" @submit.prevent>
        <div class="modal-body">
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Titulo</label>
            <input class="form-control" type="text" required v-model="form.title" />
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text  w-25  text-wrap text-start" for="">Url de imagen</label>
            <input class="form-control" type="text" required v-model="form.urlSource">
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start" for="">Texto alternativo</label>
            <input class="form-control" type="text" required v-model="form.alternativeText">
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start" for="">Alto (%)</label>
            <input class="form-control" type="number" min="1" max="100" required v-model="form.height">
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start" for="">Ancho (%)</label>
            <input class="form-control" type="number" min="1" max="100" required v-model="form.width">
          </div>
          <div class="input-group mb-2" v-if="!custom">
            <label class="input-group-text w-25 text-wrap text-start" for="">Capa</label>
            <select class="form-select" v-model="form.parentId" required>
              <option value="">Seleccione la capa a ingresar elemento</option>
              <option v-for="layer of container" :key="layer._id" :value="layer._id">
                {{layer.title}}
              </option>
            </select>
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Estilos</label>
            <button class="btn btn-secondary" @click="addStyle">Añadir estilo</button>
          </div>
          <div class="input-group mb-2" v-for="(style,key) of form.styles" :key="key">
            <label class="input-group-text w-25 text-wrap text-start" for="">Propiedad</label>
              <select class="form-select" v-model="style.property" required>
                <option value="">Seleccione un estilo</option>
                <option v-for="(styleSelect,keyStyle) of styles" :key="key+keyStyle" :value="styleSelect">
                  {{styleSelect}}
                </option>
              </select>  
              <div class="input-group mb-2">
                <label class="input-group-text w-25 text-wrap text-start" for="">Valor</label>
                <input class="form-control" type="text" v-model="style.value">
              </div>
                  <button class="mb-2 btn btn-danger" @click="removeStyle(key)">Eliminar Estilo</button>
           </div>
        </div>
        <div class="modal-footer">
          <button
            @click="$bvModal.hide('insert-image')"
             class="btn btn-secundary"
             type="button"
          >
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">Crear Imagen</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script >

import { mapActions } from "vuex";
export default {
  name: "InsertImage",
  data: function () {
    return {
      form: {
        pageId: null,
        type: "Image",
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
        events: [],
        styles: [{
            property: "",
            value: ""
        }],
        isStatic: true,
        urlSource: "",
        alternativeText: "",
        isLocked: false,
        parentId: ""
      },
      modalShow: true,
    };
  },
  props: ["custom"],
  async created() {
    await this.$store.dispatch('element/getStyles')
  },
  methods: {
    ...mapActions({
      createElement: "element/createElement",
    }),
    async createImage() {
      this.form.pageId = this.custom?this.$route.params.customId :this.$route.params.pageId
      if(this.custom){
        this.form.parentId = this.$route.params.customId
      }
      let formInfo = {...this.form}
      formInfo.width = parseFloat(formInfo.width) 
      formInfo.height = parseFloat(formInfo.height) 
      formInfo.startTime = parseFloat(formInfo.startTime) 
      formInfo.endTime = parseFloat(formInfo.endTime) 
      if(this.custom){
        let custom = {...this.$store.state.element.customComponent}
        custom.childComponents.push(formInfo)
        await this.$store.dispatch('element/updateElementCustomSize', custom);
      }else{
        let payload = {
          idProject: this.project._id,
          element: formInfo
        }
        await this.createElement(payload);
      }
      this.resetForm()
      this.$bvModal.hide('insert-image')
    },
    resetForm(){
        this.form.pageId= null,
        this.form.type= "Image",
        this.form.title= "",
        this.form.description= "",
        this.form.xPosition= 0,
        this.form.yPosition= 0,
        this.form.zPosition= 1,
        this.form.width= 1,
        this.form.height= 1,
        this.form.startTime= 0,
        this.form.endTime= 0,
        this.form.isSelected= true,
        this.form.isActive= true,
        this.form.isVisible= true,
        this.form.events= [],
        this.form.styles= [{
            property: null,
            value: null
        }],
        this.form.isStatic= true,
        this.form.urlSource= "",
        this.form.alternativeText= ""
        this.form.isLocked= false
    },
    addStyle(){
        this.form.styles.push({
            property: "",
            value: ""
        })
    },
    removeStyle(index){
        this.form.styles.splice(index, 1);
    }
  },

  computed: {
    project() {
      return this.$store.state.project.project;
    },
    container(){
      if (this.$store.state.element.elements[0]){
         return this.$store.state.element.elements[0].childElements
      }
      return []
    },
    styles(){
      if(this.$store.state.element.styles){
        return this.$store.state.element.styles
      } 
      return []
    }
  },
}
;
</script>


<style scoped>
textarea {
  resize: none;
  border: 1px black solid;
  padding: 1%;
}

</style>
