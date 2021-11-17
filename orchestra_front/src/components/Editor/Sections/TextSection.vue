<template>
  <section>
      <h3>Sección de texto</h3>
      <form @submit="addText">
        <label>Ingrese el texto </label>
        <input type="text" required v-model="text">
        <button type="submit">Ingresar texto</button>
      </form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TextSection',
  data(){
    return {
      text : ''
    }
  },
  methods:{
    addText(e:any){
      e.preventDefault()
      this.$store.dispatch('editor/addElementListText', this.text) 
    }
  }
  
});
</script>

<style scoped>

</style>