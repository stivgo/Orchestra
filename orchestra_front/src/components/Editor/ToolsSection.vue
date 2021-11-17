<template>
  <div>
    <section v-if="sectionSelected === 0">
        <h3>Secciones</h3>
    </section>
    <TemplateSection v-if="sectionSelected === 1"/>
    <GallerySection v-if="sectionSelected === 2"/>
    <ContainerSection v-if="sectionSelected === 3"/>
    <TextSection v-if="sectionSelected === 4"/>
    <ImagesSection v-if="sectionSelected === 5"/>
    <ButtonSection v-if="sectionSelected === 6"/>
    <MenuSection v-if="sectionSelected === 7"/>
    <QRSection v-if="sectionSelected === 8"/>
    <AudioSection v-if="sectionSelected === 9"/>
    <VideoSection v-if="sectionSelected === 10"/>
    <CustomSection v-if="sectionSelected === 11"/>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AudioSection from './Sections/AudioSection.vue';
import ButtonSection from './Sections/ButtonSection.vue';
import ContainerSection from './Sections/ContainerSection.vue';
import CustomSection from './Sections/CustomSection.vue';
import GallerySection from './Sections/GallerySection.vue';
import ImagesSection from './Sections/ImagesSection.vue';
import MenuSection from './Sections/MenuSection.vue';
import QRSection from './Sections/QRSection.vue';
import TemplateSection from './Sections/TemplateSection.vue';
import TextSection from './Sections/TextSection.vue';
import VideoSection from './Sections/VideoSection.vue';


export default Vue.extend({
  name: 'ToolsSection',
  components:{
    AudioSection,
    ButtonSection,
    ContainerSection,
    CustomSection,
    GallerySection,
    ImagesSection,
    MenuSection,
    QRSection,
    TemplateSection,
    TextSection,
    VideoSection
  },
  computed:{
    sectionSelected(){
      return this.$store.state.editor.sectionSelected
    }
  }
  
});
</script>

<style scoped>
section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70%;
    align-items: center;
}
</style>
