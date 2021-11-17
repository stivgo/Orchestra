<template>
  <main>
    <div class="video" id="video">

      <button v-for="element in listButtons" :key="element._id" :id="element._id" :style="element.stylesString+'width:'+
        element.width+'%;'+'height:'+element.height+'%;'+'z-index:'+element.zPosition+';top:'+element.yPosition+'%;left:'+element.xPosition+
        '%;position:absolute;' + (element.isStatic ? '' : 'display:none;') ">
        {{ element.content }}
      </button>
      <img v-for="element in listImages" :key="element._id" :src="element.urlSource" :alt="element.alternativeText" :id="element._id" 
        :style="element.stylesString+'width:'+element.width+'%;'+'height:'+element.height+'%;'+
        'z-index:'+element.zPosition+';top:'+element.yPosition+'%;left:'+element.xPosition+'%;position:absolute;' + (element.isStatic ? '' : 'display:none;')"  />
      <p v-for="element in listText" :key="element._id" :style="element.stylesString+'width:'+element.width+'%;'+'height:'+element.height+'%;'+
        'z-index:'+element.zPosition+';top:'+element.yPosition+'%;left:'+element.xPosition+'%;position:absolute;' + (element.isStatic ? '' : 'display:none;')" :id="element._id">
        {{ element.content }}
      </p>
      <div v-for="element in listCustom" :key="element._id"
        :style="element.stylesString+'width:'+element.width+'%;'+'height:'+element.height+'%;'+
          'z-index:'+element.zPosition+';top:'+element.yPosition+'%;left:'+element.xPosition+'%;position:absolute;'"
      >
        <div 
           v-for="(item,index) of element.childComponents" :key="element._id+index"
           :style="item.stylesString+'width:'+item.width+'%;'+'height:'+item.height+'%;'+
          'z-index:'+item.zPosition+';top:'+item.yPosition+'%;left:'+item.xPosition+'%;position:absolute;'
           + (item.isStatic ? '' : 'display:none;')">
          <p v-if="item.type == 'Paragraph'" :style="item.stylesString+'width:100%; height:100%'">{{item.content}} </p>
          <img v-if="item.type == 'Image'" :src="item.urlSource" :alt="item.alternativeText" :style="item.stylesString+'width:100%; height:100%'">
          <button v-if="item.type == 'Button'" :style="item.stylesString+'width:100%; height:100%'"> 
            {{item.content}}
          </button>
        </div>    
      </div>
      <audio v-for="element of listAudio" :key="element._id" controls :style="element.stylesString+'width:'+element.width+'%;'+'height:'+element.height+'%;'+
        'z-index:'+element.zPosition+';top:'+element.yPosition+'%;left:'+element.xPosition+'%;position:absolute;'+ (element.isStatic ? '' : 'display:none;')" :id="element._id" >
          <source :src="'https://docs.google.com/uc?export=open&id='+element.urlSource">
      </audio>
      <iframe v-for="element of listVideo" :key="element._id" :style="element.stylesString+'width:'+element.width+'%;'+'height:'+element.height+'%;'+
        'z-index:'+element.zPosition+';top:'+element.yPosition+'%;left:'+element.xPosition+'%;position:absolute;'+ (element.isStatic ? '' : 'display:none;')" :id="element._id"
          :src="element.urlSource">
      </iframe>
      <!-- <ul v-for="element of listMenu" :key="element._id" :style="element.stylesString+'width:'+element.width+'%;'+'height:'+element.height+'%;'+
        'z-index:'+element.zPosition+';top:'+element.yPosition+'%;left:'+element.xPosition+'%;position:absolute;'+ (element.isStatic ? '' : 'display:none;')" :id="element._id">
          <li v-for="(item,index) of element.menuItems" :key="element._id+index">
            {{item.text}}
          </li>
        </ul> -->

      <div class="slide-container" v-for="element of listMenu" :key="element._id" :style="element.stylesString+'width:'+element.width+'%;'+'height:'+element.height+'%;'+
        'z-index:'+element.zPosition+';top:'+element.yPosition+'%;left:'+element.xPosition+'%;position:absolute;'+ (element.isStatic ? '' : 'display:none;')" :id="element._id">
          <span  v-for="(item,index) of element.menuItems" :key="element._id+index"
           class="slider-span" :id="'slider-span'+element._id+index"></span>
          <div class="image-slider">
            <div v-for="(item,index) of element.menuItems" :key="element._id+index+'1'" class="slides-div" :id="'slide-'+element._id+index">     
              <a :href="'#slider-span'+element._id+index" class="button" :id="'button-'+element._id+index">
                <img :src="item.text"    alt="" class="imagenes" :id="'img'+element._id+index">
              </a>
            </div>
          </div>
        </div>
      <a v-for="element in listLink" :key="element._id" :style="element.stylesString+'width:'+element.width+'%;'+'height:'+element.height+'%;'+
        'z-index:'+element.zPosition+';top:'+element.yPosition+'%;left:'+element.xPosition+'%;position:absolute;' + (element.isStatic ? '' : 'display:none;')" :id="element._id" :href="'//'+element.urlSource"> {{element.content}} </a>         
    </div>
  </main>
</template>

<script>
import generate from './template'

export default {
  name: 'Main',
  async created() {
    let payload = {
      idProject: this.$route.params.projectId,
      idPage: this.$route.params.pageId,
    };
    await this.$store.dispatch('element/getElementsByPage', payload);
  },
  data() {
    return {
      newTask: '',
      height: 0,
      width: 0,
      active: null,
    };
  },
  mounted() {
    let video = document.getElementById('video');
    this.height = video.clientHeight;
    this.width = video.clientWidth;
    if(this.$route.query.export){
      this.generateHTML(video)
    }else{
      this.timeline()
    }
  },
  methods: {
    generateHTML(content){
      const text = generate(content.innerHTML, JSON.stringify(this.itemsLineTime),this.page.endTime)
      let element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', this.page.name+'.html');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
      this.$router.replace({ name: "Editor", params: { projectId: this.$route.params.projectId,
       sectionId: this.$route.params.sectionId ,pageId: this.$route.params.pageId} })
    },
    timeline(){
      let tiempo = this.page.endTime
      let actual = 0
      let interval = setInterval(() => {
        this.itemsLineTime.forEach(item => {
          let element = document.getElementById(item._id)
          if(actual === item.startTime){
            element.style.display= "block"
          }
          if(actual === item.endTime){
            element.style.display= "none"
          }
        });
        actual+=50
        if(actual>=tiempo) clearInterval(interval)
        }, 50)
    },
    
  },
  computed: {
    listText() {
      let container = this.$store.state.element.elements[0];
      if (container) {
        let filter = [] 
        for (const layer of container.childElements ){
          if(layer.childElements){
            const filter2 = layer.childElements.filter(
              (element) => element.type === 'Paragraph'
            );
            filter = filter.concat(filter2)
          }
        }
        return filter;
      }
      return [];
    },
    listImages() {
      let container = this.$store.state.element.elements[0];
      if (container) {
        let filter = [] 
        for (const layer of container.childElements ){
          if(layer.childElements){
          const filter2 = layer.childElements.filter(
            (element) => element.type === 'Image'
          );
          filter = filter.concat(filter2)
          }
        }
        return filter;
      }
      return [];
    },
    listButtons() {
      let container = this.$store.state.element.elements[0];
      if (container) {
        let filter = [] 
        for (const layer of container.childElements ){
          if(layer.childElements){
            const filter2 = layer.childElements.filter(
              (element) => element.type === 'Button'
            );
            filter = filter.concat(filter2)
          }
        }
        return filter;
      }
      return [];
    },
    listCustom() {
      let container = this.$store.state.element.elements[0];
      if (container) {
        let filter = [] 
        for (const layer of container.childElements ){
          if(layer.childElements){
            const filter2 = layer.childElements.filter(
              (element) => element.type === 'CustomComponent'
            );
            filter = filter.concat(filter2)
          }
        }
        return filter;
      }
      return [];
    },
    listAudio() {
      let container = this.$store.state.element.elements[0];
      if (container) {
        let filter = [] 
        for (const layer of container.childElements ){
          if(layer.childElements){
            const filter2 = layer.childElements.filter(
              (element) => element.type === 'Audio'
            );
            filter = filter.concat(filter2)
          }
        }
        return filter;
      }
      return [];
    },
    listVideo() {
      let container = this.$store.state.element.elements[0];
      if (container) {
        let filter = [] 
        for (const layer of container.childElements ){
          if(layer.childElements){
            const filter2 = layer.childElements.filter(
              (element) => element.type === 'Video'
            );
            filter = filter.concat(filter2)
          }
        }
        return filter;
      }
      return [];
    },
    listLink() {
      let container = this.$store.state.element.elements[0];
      if (container) {
        let filter = [] 
        for (const layer of container.childElements ){
          if(layer.childElements){
            const filter2 = layer.childElements.filter(
              (element) => element.type === 'Link'
            );
            filter = filter.concat(filter2)
          }
        }
        return filter;
      }
      return [];
    },
    listMenu() {
      let container = this.$store.state.element.elements[0];
      if (container) {
        let filter = [] 
        for (const layer of container.childElements ){
          if(layer.childElements){
            const filter2 = layer.childElements.filter(
              (element) => element.type === 'Menu'
            );
            filter = filter.concat(filter2)
          }
        }
        return filter;
      }
      return [];
    },
    itemsLineTime(){
      return this.$store.state.element.timeLine.elements
    },
    page(){
      return this.$store.state.element.page
    },
    
  },
};
</script>

<style scoped>
</style>
