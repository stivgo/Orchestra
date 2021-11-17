<template>
  <nav>
      <div class="up">
          <b>Iniciándose con Orchesta</b>
          <p>¿Qué es Orchesta?</p>
          <p>¿Qué es un componente?</p>
          <p>¿Qué formatos son permitidos en Orchesta?</p>
          <p>¿Cuál es el tamaño máximo de un componente?</p>
          <p>¿Cómo usar el editor?</p>
          <p>¿Cómo exportar mi proyecto?</p>
      </div>
      <div class="down">
          <router-link to="/">Ajustes</router-link>
          <router-link to="/FAQ">Ayuda</router-link>
          <router-link to="/">Acerca de</router-link>
      </div>  
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Navbar'
  
});
</script>

<style scoped>
nav{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 85vh;
  padding: 2%;
  background: #f3f3f3;
}
nav .up{
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  text-align: start;
  justify-content: space-around;
  height: 60%;
}

nav .down{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 40%;
  justify-content: end;
}
</style>
