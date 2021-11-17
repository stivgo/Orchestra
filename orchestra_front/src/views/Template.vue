<template>
    <div class="template">
        <Header :placeholder="'Buscar en plantillas'"/>
        <div class="content">
          <Navbar class="nav"/>
          <Main class="main"/>
    </div>
  </div>
</template>

<script>
import Main from '@/components/Template/Main.vue'
import Header from '@/components/Global/Header.vue';
import Navbar from '@/components/Global/Navbar.vue';
export default {
    name: 'Template',
    components: {
        Main,
        Header,
        Navbar
    },



}
</script>

<style scoped>
.template{
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
