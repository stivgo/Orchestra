<template>
  <div >
    <b-modal :id="'edit-button'+(element.indexS?element.indexS:element._id)" hide-footer centered title="Editar Boton">
      <form @submit="updateText" @submit.prevent>
        <div class="modal-body">
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Titulo</label>
            <input class="form-control" type="text" required v-model="element.title" />
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start" for="">Contenido</label>
            <textarea class="form-control"
              name="textarea" rows="5" cols="35"
              v-model="element.content" required
            >
            </textarea>
          </div>
          <div class="input-group mb-2" v-if="!custom">
            <div class="input-group mb-2">
              <label class="input-group-text w-25 text-wrap text-start" for="">z-index</label>
              <input class="form-control" type="text"  required v-model="element.zPosition">
            </div>
            <label class="input-group-text w-25 text-wrap text-start" for="">Capa</label>
            <select class="form-select" v-model="element.parentId" disabled >
              <option v-for="layer of container" :key="layer._id" :value="layer._id">
                {{layer.title}}
              </option>
            </select>
          </div>
          <div class="input-group mb-2">
            <label class="input-group-text w-25 text-wrap text-start">Estilos</label>
            <button  class="btn btn-secondary" @click="addStyle">Añadir estilo</button>
          </div>
          <div class="input-group mb-2" v-for="(style,key) of element.styles" :key="key">
            <label class="input-group-text w-25 text-wrap text-start" for="">Propiedad</label>
            <select v-model="style.property" required>
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
          <button
            @click="$bvModal.hide('edit-button'+(element.indexS?element.indexS:element._id))"
             class="btn btn-secundary" type="button"
          >
            Cerrar
          </button>
          <button type="submit" class="btn btn-primary">Actualizar Boton</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script >

import { mapActions } from "vuex";
export default {
  name: "EditText",
  props:['element', 'custom', 'index', 'customElement'],
  data: function () {
    return {
      modalShow: true,
    };
  },
  methods: {
    ...mapActions({
      updateElement: "element/updateElement",
    }),
    async updateText() {
      this.element.startTime = parseFloat(this.element.startTime) 
      this.element.endTime = parseFloat(this.element.endTime)
      this.element.zPosition  = parseFloat(this.element.zPosition)
      const element = {...this.element}
      delete element.xPositionE
      delete element.yPositionE
      delete element.widthE
      delete element.heightE
      if(this.custom){
        this.customElement.childComponents[this.index] = element
        this.$store.dispatch('element/updateElementCustomSize', this.customElement);
      }else{
        let payload = {
            idProject: this.project._id,
            element: element
        }
        await this.updateElement(payload);
      }
      this.$bvModal.hide('edit-button'+(this.element.indexS?this.element.indexS:this.element._id))
    },
    addStyle(){
        this.element.styles.push({
            property: "",
            value: ""
        })
    },
    removeStyle(index){
        this.element.styles.splice(index, 1);
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
input {
  border: 1px black solid;
}
textarea {
  resize: none;
  border: 1px black solid;
  padding: 1%;
}
</style>
