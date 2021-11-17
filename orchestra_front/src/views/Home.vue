<template>
  <div class="home">
    <Header :placeholder="'Buscar en librería de plantillas'"/>
    <div class="content">
      <Navbar class="nav"/>
      <Main class="main"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Global/Header.vue';
import Navbar from '@/components/Global/Navbar.vue';
import Main from '@/components/Home/Main.vue';


export default Vue.extend({
  name: 'Home',
  components: {
    Header,
    Navbar,
    Main
  },
});
</script>
<style scoped>
.home{
  display: flex;
  flex-direction: column;
}
.content{
  display: flex;
}

.content .nav{
  width: 20%;
}

.content .main{
  width: 80%;
}


</style>
