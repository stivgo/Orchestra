<template>
  <div class="editor">
    <div class="navbar-custom">
      <Navbar />
    </div>
    <div class="main">
      <Main />
    </div>
  </div>
</template>

<script>
import Main from '@/components/CustomComponentEditor/Main.vue';
import Navbar from '@/components/CustomComponentEditor/Navbar.vue';
export default {
    name: 'CustomComponentEditor',
    components: {
        Main,
        Navbar
    },
    data() {
        return {
        
        }
    },
    methods: {
       
    }
}   
</script>

<style >
.editor {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.navbar-custom {
  width: 7%;
  padding: 0 0;

}

.main {
  width: 93%;
  height: 100%;
}

</style>
