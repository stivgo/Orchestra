<template>
  <main>
      <BeginSection/>
      <ProjectSection/>
      <TemplateSection/>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import BeginSection from './Main/BeginSection.vue';
import ProjectSection from './Main/ProjectSection.vue';
import TemplateSection from './Main/TemplateSection.vue';

export default Vue.extend({
  name: 'Main',
  components:{
      BeginSection,
      ProjectSection,
      TemplateSection
  }
  
});
</script>

<style scoped>
main{
  overflow-y: scroll;
  height: 80vh;
  width: 100%;
}

main::-webkit-scrollbar-track {
  /* border: 1px solid #000; */
  padding: 2px 0;
  border-radius: 8px;
}

main::-webkit-scrollbar {
  width: 15px;
}

main::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: white;
  border: 1px solid #000;
}

</style>