<template>
  <section>
    <div class="title">
      <h1>Plantillas</h1>
    </div>
    <div class="main">
      <TemplateInfo v-for="(template) in templates" :key="template._id" :template="template" />
    </div>
  </section>
</template>

<script>
import TemplateInfo from './Main/TemplateInfo.vue'


export default {
  name: "Main",
  components: {
    TemplateInfo
  },
  mounted() {
    this.$store.dispatch("project/getTemplates");
  },
  computed: {
    templates() {
      return this.$store.state.project.templates ? this.$store.state.project.templates : [];
    },
  },
};
</script>

<style scoped >

.title {
  display: flex;
  justify-content: center;
}
</style>