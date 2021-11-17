<template>
  <aside>
      <div class="up">
        <div class="user">
            <img src="@/assets/user.png" alt="Foto de usuario">
            <p>{{user}}</p>
        </div>
        <router-link v-bind:class= "path==='Home' ?  'selected' : 'unselected'" to="/">Inicio</router-link>
        <router-link v-bind:class= "path==='MyProjects' || path==='PreviewProject' || path==='customComponent' ?  'selected' : 'unselected'" to="/myProjects">Mis proyectos</router-link>
        <router-link v-bind:class= "path==='Template' || path==='PreviewTemplate' ?  'selected' : 'unselected'" to="/template">Plantillas</router-link>
        <router-link v-bind:class= "path==='Organization' ?  'selected' : 'unselected'" to="/organization">Organizaciones</router-link>
        <a id="logout-link" class="unselected" href="#" @click.prevent="logout">Cerrar sesión</a>
      </div>
      <div class="down">
        <router-link to="/FAQ">Ayuda</router-link>
      </div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Navbar',
  data(){
    return{
      path: '' as string
    }
  },
  created(){
   this.path = this.$route.name || ''
  },
  computed: {
    user() {
      let user = this.$store.getters['session/user']
      return user.firstName +" "+ user.lastName;
    }
  },
  methods: {
    logout(evt:any){
      if(confirm("¿Estás seguro que quieres cerrar sesión?")){
        this.$store.dispatch('session/logoutSession');
        this.$router.go(0);
      }
    }
  }

  
});
</script>
<style scoped>
a{
  text-decoration: none;
}
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
.user p{
  font-weight: 600;
  margin: 0;
}
.unselected{
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
  color: var(--first-color);
  margin: 1%;
}

.selected{
  color: var(--first-color);
  background: var(--second-color);
  margin: 3%;
  border-radius: 10px;
  font-weight: 700;
  padding: 3%;
  border: var(--first-color) 2px solid;
  cursor: default;
}
.selected, .unselected{
  text-align: center;
}
</style>
