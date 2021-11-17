<template>
  <section>
    <div class="info">
      <h2> <i class="fal fa-folders"></i> {{section.name}}</h2>
    </div>
      <div class="page">
          <Page v-for="(page,key) of section.pages" :key="key" :page="page" :section="section"/>
      </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Page from './Page.vue'

export default Vue.extend({
  name: 'Section',
  components:{
      Page,
  },
  props:["section"], 
  
});
</script>

<style scoped>
section{
  display: flex;
  align-items: flex-start;
  padding: 1rem;
}

section .info{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

section .info h2{
  margin: 0;
}

section .info .buttons{
  display: flex;
  width: 40%;
}

.page{
  width: 100%;
}
button{
  color: var(--second-color);
  background-color: var(--first-color);
  font-weight: 600;
  padding: 0.5% 1%;
  border-radius: 20px;
}

.edit, .delete{
  color: var(--second-color);
  background-color: var(--first-color);
  width: 50%;
  padding: 2%;
  border-radius: 15px;
  text-align: center;
  margin: 1.5%;
}

.delete{
  color: var(--second-color);
  background-color: #E8463C;
}
</style>
