<template>
  <section>
    <div class="info">
      <h2> <i class="fal fa-folders"></i> {{section.name}}</h2>
      <div class="buttons">
        <button class="edit" @click="$bvModal.show('ModalEditSection'+section._id)">Editar sección</button>
        <ModalEditSection :section="section" @update-project="updateProject"/>
        <button class="delete" @click="$bvModal.show('ModalDeleteSection'+section._id)">Eliminar sección</button>
        <ModalDeleteSection :section="section" @update-project="updateProject"/>
      </div>
    </div>
          <button @click="$bvModal.show('ModalInsertPage'+section._id)">Insertar Pagina</button>
          <ModalInsertPage :section="section" @update-project="updateProject"/>
      <div class="page">
          <Page v-for="(page,key) of section.pages" :key="key" :page="page" @update-project="updateProject" :section="section"/>
      </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Page from './Page.vue'
import ModalInsertPage from './ModalInsertPage.vue'
import ModalEditSection from './ModalEditSection.vue'
import ModalDeleteSection from './ModalDeleteSection.vue' 

export default Vue.extend({
  name: 'Section',
  components:{
      Page,
      ModalInsertPage,
      ModalEditSection,
      ModalDeleteSection
  },
  props:["section"], 
  methods:{
    updateProject(){
      this.$emit('update-project')
    }
  } 
  
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
