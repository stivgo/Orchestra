<template>
    <section>
        <div class="title">
            <h1>Mis Proyectos</h1>
            <button class="new-project" @click="$bvModal.show('ModalProject')">
                Crear nuevo proyecto
            </button>
            <ModalProject :name="'Project'"/>
        </div>
        <div class="main">
            <Project v-for="project in projects" v-bind:key="project.id" :project="project"/>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Project from './SectionProjects/Project.vue'
import ModalProject from '../Global/ModalProject.vue'

export default Vue.extend({
  name: 'SectionProjects',
  components:{
      Project,
      ModalProject
  },
  computed: {
    projects() {
      return this.$store.state.project.projects;
    }
  },
  
});
</script>


<style scoped>
section{
  overflow-y: scroll;
  height: 80vh;
  width: 100%;
}
.title{
    display: flex;
    justify-content: space-around;
}
.new-project{
    color: var(--second-color);
    background-color: var(--first-color);
    font-weight: 600;
    padding: 0.4% 2%;
    border-radius: 20px;
    height: 100%;
}
</style>
