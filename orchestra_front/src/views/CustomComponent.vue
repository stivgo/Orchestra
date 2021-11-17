<template>
    <div class="custom-component">
        <div class="header">
          <Header :placeholder="'Buscar elemento personalizado'"/>
        </div>
        <div class="main">
          <Navbar class="nav"/>
          <SectionCustom/>
        </div>
    </div>
</template>

<script>
import Header from '../components/Global/Header.vue'
import Navbar from '../components/Global/Navbar.vue'
import SectionCustom from '../components/CustomComponent/SectionCustom.vue'
export default {
    name: 'CustomComponent',
    components: {
        Header,
        Navbar,
        SectionCustom
    }
    
}
</script>

<style>
.custom-component{
  display: flex;
  flex-direction: column;
}

.custom-component .main{
  display: flex;
  width: 100%;
}

.custom-component .nav{
  width: 25%;
}

.custom-component .section{
  width: 80%;
}


</style>
