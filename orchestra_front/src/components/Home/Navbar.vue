<template>
  <aside>
      <div class="up">
        <div class="user">
            <img src="@/assets/logo.png" alt="Foto de usuario">
            <p>Nombre de Usario</p>
        </div>
        <router-link to="/">Home</router-link>
        <router-link to="/">Mis proyectos</router-link>
        <router-link to="/">Plantillas</router-link>
      </div>
      <div class="down">
        <router-link to="/">Ajustes</router-link>
        <router-link to="/">Ayuda</router-link>
        <router-link to="/">Acerca de</router-link>
      </div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Navbar'
  
});
</script>
<style scoped>
aside{
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85vh;
  padding: 2%;
}
img{
  width: 2rem;
  border-radius: 20px;
  border: solid 1px gray;
}
.up,.down{
  display: flex;
  flex-direction: column;
}
.up .user{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.up a{
  color: var(--second-color);
  background: var(--first-color);
  margin: 3%;
  border-radius: 10px;
  font-weight: 700;
  padding: 3%;
}
.down{
  align-items: flex-start;
}
.down a{
  color: #7e7e7e;
  margin: 1%;
}

</style>