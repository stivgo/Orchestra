<template>
  <div class="my-projects">
    <div>
      <Header :placeholder="'Buscar en proyectos'" />
    </div>
    <div class="main">
      <Navbar class="nav"/>
      <SectionProjects class="section"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '../components/Global/Header.vue'
import Navbar from '../components/Global/Navbar.vue'
import SectionProjects from '../components/MyProjects/SectionProjects.vue'

export default Vue.extend({
  name: 'MyProjects',
  components:{
    Header,
    Navbar,
    SectionProjects
  }
});
</script>
<style scoped>
.my-projects{
  display: flex;
  flex-direction: column;
}
.main{
  display: flex;
  width: 100%;
}

.main .nav{
  width: 20%;
}

.main .section{
  width: 80%;
}

</style>
