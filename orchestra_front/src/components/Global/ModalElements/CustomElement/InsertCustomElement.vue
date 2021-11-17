<template>
    <b-modal :id="'insert-custom'" hide-footer centered title="Insertar elemento personalizado">
      <form @submit="InsertCustom" @submit.prevent>
        <div class="modal-body">
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Titulo</label>
            <input class="form-control" type="text" required v-model="form.title" />
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start" for="">Capa</label>
            <select class="form-select" v-model="form.parentId" required>
              <option value="">Seleccione la capa a ingresar elemento</option>
              <option v-for="layer of container" :key="layer._id" :value="layer._id">
                {{layer.title}}
              </option>
            </select>
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start" for="">Plantilla</label>
            <select class="form-select" v-model="form.templateId" required>
              <option value="">Seleccione la plantilla del elemento</option>
              <option v-for="layer of customComponents" :key="layer._id" :value="layer._id">
                {{layer.name}}
              </option>
            </select>
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Estilos</label>
            <button class="btn btn-secondary" @click="addStyle">Añadir estilo</button>
          </div>
          <div class="input-group mb-2" v-for="(style,key) of form.styles" :key="key">
            <label class="input-group-text w-25 text-wrap text-start" for="">Propiedad</label>
            <select class="form-select" v-model="style.property">
              <option value="">Seleccion un estilo</option>
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
          <button type="button" @click="$bvModal.hide('insert-custom')" class="btn btn-secundary">
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">
            Insertar elemento personalizado
          </button>
        </div>
      </form>
    </b-modal>
</template>

<script >

import { mapActions } from "vuex";
export default {
  name: "InsertCustomElement",
  data: function () {
    return {
      form: {
        pageId: "",
        type: "CustomComponent",
        title: "",
        description: "",
        xPosition: 1,
        yPosition: 1,
        zPosition: 1,
        width: 1,
        height: 1,
        startTime: 0,
        endTime: 0,
        isSelected: true,
        isActive: true,
        isVisible: true,
        isLocked: false,
        isStatic: true,
        events: [],
        styles: [{
            property: "",
            value: ""
        }],
        parentId: "",
        childComponents: [],
        templateId: "",
      },
    };
  },
  async created() {
    await this.$store.dispatch('element/getStyles')
  },
  methods: {
    ...mapActions({
      createElement: "element/createCustomElement",
    }),
    async InsertCustom() {
      this.form.pageId = this.$route.params.pageId
      let formInfo = {...this.form}
      formInfo.startTime = parseFloat(formInfo.startTime) 
      formInfo.endTime = parseFloat(formInfo.endTime) 
      let payload = {
          idProject: this.$route.params.projectId,
          element: formInfo
      }
      await this.createElement(payload);
      this.resetForm()
      this.$bvModal.hide('insert-custom')
    },
    resetForm(){
        this.form.pageId= "",
        this.form.type= "CustomComponent",
        this.form.title= "",
        this.form.description= "",
        this.form.xPosition= 1,
        this.form.yPosition= 1,
        this.form.zPosition= 1,
        this.form.width= 1,
        this.form.height= 1,
        this.form.startTime= 0,
        this.form.endTime= 0,
        this.form.isSelected= true,
        this.form.isActive= true,
        this.form.isVisible= true,
        this.form.isLocked= false,
        this.form.events= [],
        this.form.styles= [{
            property: "",
            value: ""
        }]
        this.form.parentId= "",
        this.form.childComponents= [],
        this.form.templateId= "",
        this.form.parentId= ""
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
    },
    customComponents: function () {
      return this.$store.state.element.customComponents ? this.$store.state.element.customComponents : [] ;
    }
  },
}
;
</script>


<style scoped>

</style>
