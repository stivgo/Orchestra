<template>
  <section class="preview-project" v-if="project != null">
      <div class="title">
          <h1>{{project.name}}</h1>
      </div>
      <div>
          <Section v-for="(section,key) of project.baseProject.sections" :key="key" :section="section"/>
      </div>

  </section>
</template>

<script>
import Section from './SectionProject/Section.vue'

export default{
  name: 'SectionProject',
  components:{
    Section
  },
  data: function () {
    return {
      project: null,
    }
  },
  async created() {
    await this.$store.dispatch('project/getTemplateById', this.$route.params.id);
    this.project = this.$store.state.project.template;
    console.log(this.project);
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
