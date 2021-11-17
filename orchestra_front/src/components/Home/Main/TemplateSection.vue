<template>
  <section>
    <h2>Plantillas destacadas</h2>
    <div class="projects">
      <article v-for="template in templates" v-bind:key="template._id">
        <router-link :to="{name: 'PreviewTemplate', params: { id: template._id }}"> 
          {{template.name}} 
        </router-link>
      </article>
    </div>  
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TemplateSection',
  mounted(){
    this.$store.dispatch('project/getTemplates');
  },
  computed:{
    templates(){
      return this.$store.state.project.templates
    }
  }
  
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
  background: linear-gradient(180deg, #6454f0 0%, rgba(255, 255, 255, 0) 100%), #6ee2f5;
  border-radius: 10px;
}

article a{
  text-decoration: none;
  color: var(--second-color);
}
</style>