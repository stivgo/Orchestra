<template>
  <div class="editor">
    <div class="navbar">
      <Navbar />
    </div>
    <div class="main">
      <Main />
      <div class="timeline">
        <Layers class="layers"/>
        <TimeLine />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ToolsSection from '@/components/Editor/ToolsSection.vue';
import Layers from '@/components/Editor/Layers.vue';
import Main from '@/components/Editor/Main.vue';
import Navbar from '@/components/Editor/Navbar.vue';
import TimeLine from '@/components/Editor/TimeLine/TimeLine.vue';

export default Vue.extend({
  name: 'Editor',
  components: {
    Layers,
    Main,
    Navbar,
    TimeLine,
  },
  async created(){
    await this.$store.dispatch('element/getStyles')
    this.$store.state.element.elements = [];
    await this.$store.dispatch('project/getProjectById', this.$route.params.projectId);
    await this.$store.dispatch('element/getCustomComponents', this.$route.params.projectId);
    await this.$store.dispatch('element/getTimeLine', this.$route.params.pageId);
    let payload = {
      idProject: this.$route.params.projectId,
      idPage: this.$route.params.pageId
    }
    await this.$store.dispatch('element/getElementsByPage', payload)
  }
});
</script>

<style scoped>
.editor {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.navbar {
  width: 8%;
  padding: 0;
}

/* .section-layer{ */
/* background-color: var(--second-color-editor) ; */
/* display: flex; */
/* flex-direction: column; */
/* justify-content: space-between; */
/* width: 20%; */
/* } */

.main {
  width: 92%;
  height: 100%;
}

.main .timeline {
    display: flex;
    height: 20%;
}

.main .timeline .layers{
  width: 19%;
}
</style>
