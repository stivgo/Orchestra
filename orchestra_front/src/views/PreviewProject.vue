<template>
  <div class="preview-project">
    <div class="header">
      <Header :placeholder="'Buscar paginas'"/>
    </div>
    <div class="main">
      <Navbar class="nav"/>
      <SectionProject class="section"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '../components/Global/Header.vue'
import Navbar from '../components/Global/Navbar.vue'
import SectionProject from '../components/PreviewProject/SectionProject.vue'

export default Vue.extend({
  name: 'PreviewProject',
  components:{
    Header,
    Navbar,
    SectionProject
  }
  
});
</script>

<style scoped>
.preview-project{
  display: flex;
  flex-direction: column;
}

.preview-project .main{
  display: flex;
  width: 100%;
}

.preview-project .nav{
  width: 20%;
}

.preview-project .section{
  width: 80%;
}

</style>
