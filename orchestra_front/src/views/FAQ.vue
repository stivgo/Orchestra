<template>
  <div class="faq">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <Navbar class="nav"/>
      <Main class="main"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '../components/Global/Header.vue'
import Navbar from '../components/FAQ/Navbar.vue'
import Main from '../components/FAQ/Main.vue'

export default Vue.extend({
  name: 'FAQ',
  components:{
    Header,
    Navbar,
    Main
  }
  
});
</script>

<style scope>
.faq{
  display: flex;
  flex-direction: column;
}

.faq .content{
  display: flex;
}

.faq .nav{
  width: 20%;
}

.faq .main{
  width: 80%;
}

</style>
