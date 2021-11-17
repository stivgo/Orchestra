<template>
  <div>
    <div class="logo">
      <img src="@/assets/OrchestraLogo.png" alt="Orchestra Logo" />
    </div>
    <nav>
      <input type="text" placeholder="Buscar en librería de plantillas" />
      <button>Crear Proyecto</button>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Header",
});
</script>


<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0% 3%;
}

.logo {
  width: 20%;
}

input {
  background: #f3f3f3;
  border-radius: 29px;
  width: 50%;
  padding: 0.5rem;
}

button {
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
