<template>
  <section>
    <div class="left">
      <h1>Inicia con un proyecto</h1>
      <button @click="$bvModal.show('ModalHeader')">Crear proyecto</button>
      <ModalProject :name="'Header'"/>
    </div>
    <div class="right">
      <div>
        <h2>¿No sabes como comenzar?</h2>
        <router-link to="/FAQ">Da click aquí</router-link>
      </div>
      <img src="@/assets/Homebook.png" alt="">
    </div>
    
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import  ModalProject from '@/components/Global/ModalProject.vue';

export default Vue.extend({
  name: 'BeginSection',
  components: {
    ModalProject
  }
  
});
</script>

<style scoped>
section{
  display: flex;
  justify-content: space-around;  
  
}
.left{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.left button{
  background: var(--first-color);
  color: var(--second-color);
  padding: 0.5rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 700;
  text-align: center;
}
.right{
  display: flex;
  background: linear-gradient(180deg, #ABD7FF 0%, rgba(255, 255, 255, 0) 100%), #3CC9E8;
  border-radius: 7px;
  justify-content: space-around;
  padding: 1%;
}

.right div{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  color: var(--second-color);
}
.right a{
  color: var(--first-color);
  background-color: var(--second-color);
  border-radius: 10px;
  font-weight: bold;
  padding: 3%;
  text-align: center;
  text-decoration: none;
}

</style>