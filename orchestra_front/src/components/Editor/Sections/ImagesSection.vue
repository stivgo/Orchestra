<template>
  <section>
      <h3>Sección de imagenes</h3>
      <form @submit="addImage">
        <label>Ingrese el source de la imagen</label>
        <input type="text" required v-model="srcImage">
        <button type="submit">Ingresar imagen</button>
      </form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ImagesSection',
  data(){
    return {
      srcImage : ''
    }
  },
  methods:{
    addImage(e:any){
      e.preventDefault()
      this.$store.dispatch('editor/addElementListImages', this.srcImage) 
    }
  }
});
</script>

<style scoped>

</style>
