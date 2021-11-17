<template>
  <section>
      <article></article>
      <article></article>
      <article></article>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ImagesSection'
  
});
</script>

<style scoped>
section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70%;
    align-items: center;
}

article{
    width: 150px;
    height: 100px;
    border: white 2px solid;
    margin: 5%;
}


</style>
