<template>
  <div>
    <b-modal :id="'insert-menu'" hide-footer centered title="Nuevo carrusel">
        <form class="row g-3" @submit="createText" @submit.prevent>
            <div class="modal-body">
                <div class="input-group mb-2">
                    <label class="input-group-text w-25"> Titulo</label>
                    <input class="form-control" type="text" required v-model="form.title" />
                </div>
                <div class="input-group  mb-2">
                    <label class="input-group-text w-25" for="">Descripción</label>
                    <textarea class="form-control" name="textarea" rows="5" cols="35" v-model="form.description" required></textarea>
                </div>
                <div class="input-group mb-2"><label class="input-group-text w-25" for="">Alto (%)</label> <input
                        class="form-control" type="number" min="1" max="100" required v-model="form.height"></div>
                <div class="input-group mb-2"><label class="input-group-text w-25" for="">Ancho (%) </label><input
                        class="form-control" type="number" min="1" max="100" required v-model="form.width"></div>
                <div class="input-group mb-2" v-if="!custom">
                    <label class="input-group-text w-25" for="">Capa</label>
                    <select class="form-select" v-model="form.parentId" required>
                        <option value="">Seleccione la capa a ingresar elemento</option>
                        <option v-for="layer of container" :key="layer._id" :value="layer._id">
                            {{layer.title}}
                        </option>
                    </select>
                </div>
                <div class="input-group mb-2">
                    <label class="input-group-text w-25">Imagenes</label>
                    <button class="btn btn-secondary" type="button" @click="addItem">Añadir Imagen</button>
                </div>
                <div class="input-group mb-2" v-for="(item,key) of form.menuItems" :key="item.type+key">
                    <div class="input-group mb-2">
                        <label class="input-group-text w-25" for="">Url</label>
                        <input class="form-control w-25" type="text" v-model="item.text">
                        <button class="btn btn-danger" type="button" @click="removeItem(key)">Eliminar</button>
                    </div>        
                </div>
                <div class="input-group mb-2">
                    <label class="input-group-text w-25">Estilos</label>
                    <button class="btn btn-secondary" type="button" @click="addStyle">Añadir estilo</button>
                </div>
                <div class="input-group mb-2" v-for="(style,key) of form.styles" :key="key">
                    <label class="input-group-text w-25" for="">Propiedad</label>
                    <select class="form-select" v-model="style.property" required>
                        <option value="">Seleccion un estilo</option>
                        <option v-for="(styleSelect,keyStyle) of styles" :key="key+keyStyle" :value="styleSelect">
                            {{styleSelect}}
                        </option>
                    </select>
                    <div class="input-group mb-2">
                        <label class="input-group-text w-25" for="">Valor</label>
                        <input class="form-control" type="text" v-model="style.value">
                    </div>
                    <button class="mb-2 btn btn-danger" type="button" @click="removeStyle(key)">Eliminar Estilo</button>
                </div>
            </div>
            <div class="modal-footer">
                <button @click="$bvModal.hide('insert-menu')" type="button" class="btn btn-secundary">
                    Cerrar
                </button>
                <button type="submit" class="btn btn-primary">Crear carrusel</button>
            </div>
        </form>
    </b-modal>
  </div>
</template>

<script >

import { mapActions } from "vuex";
export default {
  name: "InsertMenu",
  data: function () {
    return {
      form: {
        pageId: null,
        type: "Menu",
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
        isNavigable: true,
        isCyclical: false,
        urlSource: "",
        events: [],
        styles: [{
            property: "",
            value: ""
        }],
        isStatic: true,
        parentId: "",
        menuItems: [{
            text: "",
            type: "MenuItem"
        }]
      },
      modalShow: true
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
    async createText() {
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
      this.$bvModal.hide('insert-menu')
    },
    resetForm(){
        this.form.pageId= null,
        this.form.type= "Menu",
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
        this.form.isLocked= false,
        this.form.isNavigable= true,
        this.form.isCyclical= false,
        this.form.urlSource= "",
        this.form.events= [],
        this.form.styles= [{
            property: "",
            value: ""
        }],
        this.form.parentId = ""
        this.form.menuItems= [{
            text: "",
            type: "MenuItem"
        }]
    },
    addStyle(){
        this.form.styles.push({
            property: "",
            value: ""
        })
    },
    removeStyle(index){
        this.form.styles.splice(index, 1);
    },
    addItem(){
        this.form.menuItems.push({
            text: "",
            type: "MenuItem"
        })
    },
    removeItem(index){
        this.form.menuItems.splice(index, 1);
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

</style>
