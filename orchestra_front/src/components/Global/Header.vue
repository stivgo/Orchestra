<template>
  <div class="header">
    <router-link to="/">
      <img src="@/assets/OrchestraLogo.png" alt="Orchestra Logo" />
    </router-link>
    <nav>
      <input type="text" :placeholder="placeholder" />
      <button v-if="path==='Home'">Buscar</button>
      <button v-if="path==='MyProjects'" >Buscar</button>
      <button v-if="path==='Template'" >Buscar</button>
      <button v-if="path==='PreviewProject'" >Buscar</button>
      <button v-if="path==='Organization'" >Buscar</button>
      <button v-if="path==='customComponent'" >Buscar</button>
      <button v-if="path==='PreviewTemplate'" >Buscar</button>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Header",
  props: ['placeholder'],
  data(){
    return{
      path: '' as string
    }
  },
  created(){
   this.path = this.$route.name || ''
  }
});
</script>


<style scoped>
.header{
  display: flex;
}
a{
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
a img{
  width: 70%;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0% 3%;
  height: 15vh;
  width: 80%;
}

input {
  background: #f3f3f3;
  border-radius: 29px;
  width: 50%;
  padding: 0.7rem;
}

button {
  text-align: center;
  font-weight: 600;
  background: #3cc9e8;
  border-radius: 28px;
  color: white;
  padding: 0.5rem;
  width: 15%;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background: white;
  color: #3cc9e8;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
</style>