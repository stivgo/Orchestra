<template>
  <nav>
      <div>
          <router-link to="/">
            <img src="@/assets/Editor/logo-orchestra.png" alt="Logo Orchesta">
          </router-link>
      </div>
      <div class="items">
          
      </div>
      <div>
          <p>Help</p>
      </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Navbar',
  methods:{
    
  }
  
});
</script>

<style scoped>
nav{
    display: flex;
    flex-direction: column;
    background-color: var(--first-color-editor);
    height: 100%;
    width: 100%;
    justify-content: space-between;
    margin: 0;
}
button{
    background: none;
}
p{
    color: var(--third-color);
    text-align: center;
}
img{
    width: 100%;
}
.items{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.items img{
    width: 2rem;
}

.items button{
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
