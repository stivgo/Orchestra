<template>
  <section>
      <h3>Sección de botones</h3>
      <form @submit="addButton">
        <label>Ingrese el texto del botón</label>
        <input type="text" required v-model="textButton">
        <button type="submit">Ingresar boton</button>
      </form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ButtonSection',
  data(){
    return {
      textButton : ''
    }
  },
  methods:{
    addButton(e:any){
      e.preventDefault()
      this.$store.dispatch('editor/addElementListButton', this.textButton) 
    }
  }
  
});
</script>

<style scoped>

</style>
