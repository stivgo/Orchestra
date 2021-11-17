<template>
  <section>
    <h2>Tus proyectos</h2>
    <div class="projects">
      <article> 
        <button @click="$bvModal.show('ModalProject')"> + </button>
        <ModalProject :name="'Project'"/> 
      </article>
      <article v-for="project in projects" v-bind:key="project._id">
        <router-link :to="{name: 'PreviewProject', params: { id: project._id }}"> 
          {{project.name}} 
        </router-link>
      </article>
    </div>  
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import ModalProject from '../../Global/ModalProject.vue'

export default Vue.extend({
  name: 'ProjectSection',
  components:{
    ModalProject
  },

  computed: {
    projects() {
      return this.$store.state.project.projects;
    }
  },

  mounted() {
    this.$store.dispatch('project/getUserProject');
  },
  
});
</script>


<style scoped>
section{
  display: flex;
  flex-direction: column;
  margin: 2%;
}
.projects{
  margin-top: 3%;
  overflow-x: scroll;
  display: flex;
  flex-wrap: nowrap;
  width: 70vw;
}

.projects::-webkit-scrollbar-track {
  /* border: 1px solid #000; */
  padding: 2px 0;
  border-radius: 8px;
}

.projects::-webkit-scrollbar {
  height: 10px;
}

.projects::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: white;
  border: 1px solid #000;
}

article{
  width: 200px;
  height: 200px;
  margin-right: 3%;
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background: linear-gradient(180deg, #6ee2f5 0%, rgba(255, 255, 255, 0) 100%), #6454f0;
  border-radius: 10px;
}

article button{
  background-color: transparent;
  color: var(--second-color);
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
}

article a{
  text-decoration: none;
  color: var(--second-color);
}

</style>