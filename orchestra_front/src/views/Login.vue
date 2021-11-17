<template>
  <div>
    <main>
      <img src="@/assets/Login.png" alt="Logo de login">
      <form action=""  @submit.prevent="submit">
        <input type="text" placeholder="Usuario" v-model="form.email" required>
        <input type="password" placeholder="Contraseña" v-model="form.password" required>
        <button type="submit">Ingresar</button>
        <button class="signup"  @click.prevent="signUp"> Registrarse</button>
      </form>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
//import {pruebapost} from "../controllers/authentication";
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import store from '../store'

export default Vue.extend({
  name: 'Login',

  components: {
    //
  },

  data(){
    return {
      form: {
        email: '',
        passsword: '',
      }
    }
  },

  methods: {
    ...mapActions({
      signIn: 'session/loginSession'
    }),

    submit() {
      this.signIn(this.form).then(() => {
        this.$router.replace({
          name: "Home",
        })
      })
    },

    signUp(evt:any) {
      this.$router.replace({
        name: "SignUp"
      })
    }
  },

  computed: {
    ...mapGetters({
      authenticated: 'session/authenticated',
      user: 'session/user'
    })
  },

  mounted() {
    /*const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    store.dispatch('session/attemptLoginSession', {token, userId})
    .then(() => {
        this.$router.replace({
          name: "Home"
        })
      })
    .catch(err => {
      console.log("error");
    }); */

  }
  
});
</script>

<style scoped>
div{
  display: flex;
  justify-content: center;
}
main{
  background: var(--first-color);
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  
}
main img{
  width: 15rem;
}
main form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
form input{
  padding: 2%;
  margin: 2% 0%;
  color: var(--second-color);
  border: solid 2px var(--second-color);
  background: var(--first-color);
  border-radius: 5px;
  width: 25rem;
  font-weight: bold;
}
::placeholder{
  color: var(--second-color);
}

form button{
  color: var(--first-color);
  background-color: var(--second-color);
  font-weight: bold;
  padding: 2.5%;
  margin: 3%;
  width: 15rem;
  border-radius: 10px;
  font-size: 16px;
  text-align: center;
}

form .signup{
  color: var(--second-color);
  background-color: var(--first-color);
  border: 1px solid var(--second-color);
}
main a{
  color: var(--second-color);
  background-color: var(--first-color);
  font-weight: bold;
  padding: 1%;
  margin: 3%;
  width: 15rem;
  border-radius: 10px;
  border: solid 2px var(--second-color);
}

</style>