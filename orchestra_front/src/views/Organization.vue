<template>
    <div class="organization">
        <Header :placeholder="'Buscar en organizaciones'"/>
        <div class="content">
          <Navbar class="nav"/>
          <Main class="main"/>
        </div>
       
    </div>
</template>

<script>
import Main from '@/components/Organization/Main.vue'
import Header from '@/components/Global/Header.vue';
import Navbar from '@/components/Global/Navbar.vue';
export default {
    name: 'Organization',
    components: {
        Main,
        Header,
        Navbar,
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
