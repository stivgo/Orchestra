<template>
  <section class="preview-project" v-if="project != null">
      <div class="title">
          <h1>{{project.name}}</h1>
          <div class="buttons">
            <button @click="$bvModal.show('ModalInsertSection'+project._id)">Insertar nueva sección</button>
            <ModalInsertSection :project="project" @update-project="updateProject"/>
            <button @click="$bvModal.show('ModalEditProject'+project._id)">Editar información del proyecto</button>
            <ModalEditProject :project="project" @update-project="updateProject"/>
            <router-link :to="{name: 'customComponent', params: { projectId: $route.params.id} }"> 
              Mis elementos personalizados 
            </router-link>
          </div>
      </div>
      <div>
          <Section v-for="(section,key) of project.sections" :key="key" :section="section" @update-project="updateProject"/>
      </div>

  </section>
</template>

<script>
import Section from './SectionProject/Section.vue'
import ModalInsertSection from './SectionProject/ModalInsertSection.vue'
import ModalEditProject from './SectionProject/ModalEditProject.vue'

export default{
  name: 'SectionProject',
  components:{
    Section,
    ModalInsertSection,
    ModalEditProject
  },
  data: function () {
    return {
      project: null,
    }
  },
  async created() {
    await this.$store.dispatch('project/getProjectById', this.$route.params.id);
    this.project = this.$store.state.project.project;
  },
  methods: {
  async updateProject(){
    await this.$store.dispatch('project/getProjectById', this.$route.params.id);
    await this.$store.dispatch('project/getUserProject');
    this.project = this.$store.state.project.project;
  }
  },
  computed:{
     projectState() {
      return this.$store.state.project.project;
    },
  }

  
};
</script>
<style scoped>

.preview-project{
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  height: 80vh;
}

section{
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
}

section .title{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

section::-webkit-scrollbar-track {
  /* border: 1px solid #000; */
  padding: 2px 0;
  border-radius: 8px;
}

section::-webkit-scrollbar {
  width: 15px;
}

section::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: white;
  border: 1px solid #000;
}

.title h1{
  align-self: center;
}

.title .buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.title .buttons button, .title .buttons a{
  color: var(--second-color);
  background-color: var(--first-color);
  font-weight: 600;
  padding: 0.5% 1%;
  border-radius: 20px;
  text-decoration: none;
}


</style>
