<template>
  <main>
    <div class="video" id="video">
      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        v-for="element in listButtons"
        :key="element._id"
        :x="element.xPositionE"
        :y="element.yPositionE"
        :z="element.zPosition"
        :w="element.widthE"
        :h="element.heightE"
        :resizable="false"
        :draggable="false"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id)"
        @deactivated="onDeactivated"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        
        <button :id="element._id" :style="element.stylesString+'width:100%; height:100%'">
          {{ element.content }}
        </button>
      </vue-draggable-resizable>

      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        v-for="element in listImages"
        :key="element._id"
        :x="element.xPositionE"
        :y="element.yPositionE"
        :z="element.zPosition"
        :w="element.widthE"
        :h="element.heightE"
        :resizable="false"
        :draggable="false"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id)"
        @deactivated="onDeactivated"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <img :src="element.urlSource" :alt="element.alternativeText" :id="element._id" 
          :style="element.stylesString+'width:100%; height:100%'"  />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        v-for="element in listText"
        :key="element._id"
        :x="element.xPositionE"
        :y="element.yPositionE"
        :z="element.zPosition"
        :w="element.widthE"
        :h="element.heightE"
        :resizable="false"
        :draggable="false"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id)"
        @deactivated="onDeactivated"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <p :style="element.stylesString+'width:100%; height:100%'" :id="element._id">
          {{ element.content }}
        </p>
        
      </vue-draggable-resizable>

      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        v-for="element in listAudio"
        :key="element._id"
        :x="element.xPositionE"
        :y="element.yPositionE"
        :z="element.zPosition"
        :w="element.widthE"
        :h="element.heightE"
        :resizable="false"
        :draggable="false"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id)"
        @deactivated="onDeactivated"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <audio controls :style="element.stylesString+'width:98%; height:90%;'" >
          <source :src="'https://docs.google.com/uc?export=open&id='+element.urlSource">
        </audio> 
      </vue-draggable-resizable>

      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        v-for="element in listVideo"
        :key="element._id"
        :x="element.xPositionE"
        :y="element.yPositionE"
        :z="element.zPosition"
        :w="element.widthE"
        :h="element.heightE"
        :resizable="false"
        :draggable="false"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id)"
        @deactivated="onDeactivated"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <iframe :style="element.stylesString+'width:98%; height:95%;'"
          :src="element.urlSource">
        </iframe> 
      </vue-draggable-resizable>

      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        v-for="element in listMenu"
        :key="element._id"
        :x="element.xPositionE"
        :y="element.yPositionE"
        :z="element.zPosition"
        :w="element.widthE"
        :h="element.heightE"
        :resizable="false"
        :draggable="false"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id)"
        @deactivated="onDeactivated"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <ul :style="element.stylesString+'width:100%; height:100%'">
          <li v-for="(item,index) of element.menuItems" :key="element._id+index">
            {{item.text}}
          </li>
        </ul>
      </vue-draggable-resizable>

      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        v-for="element in listCustom"
        :key="element._id"
        :x="element.xPositionE"
        :y="element.yPositionE"
        :z="element.zPosition"
        :w="element.widthE"
        :h="element.heightE"
        :resizable="false"
        :draggable="false"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id)"
        @deactivated="onDeactivated"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <div 
           v-for="(item,index) of element.childComponents" :key="element._id+index"
           :style="item.stylesString+'width:'+item.width+'%;'+'height:'+item.height+'%;'+
          'z-index:'+item.zPosition+';top:'+item.yPosition+'%;left:'+item.xPosition+'%;position:absolute;'"
           >
          <p v-if="item.type == 'Paragraph'" :style="item.stylesString+'width:100%; height:100%'">{{item.content}} </p>
          <img v-if="item.type == 'Image'" :src="item.urlSource" :alt="item.alternativeText" :style="item.stylesString+'width:100%; height:100%'">
          <button v-if="item.type == 'Button'" :style="item.stylesString+'width:100%; height:100%'"> 
            {{item.content}}
          </button>
        </div>
      </vue-draggable-resizable>
    </div>   
    <!-- <div class="multimedia">
      <img src="@/assets/Editor/Previous.png" alt="Boton Anterior" />
      <img src="@/assets/Editor/Play.png" alt="Boton Play" />
      <img src="@/assets/Editor/Next.png" alt="Boton Siguiente" />
    </div> -->
  </main>
</template>

<script>
import VueDraggableResizable from '../Draggable/components/vue-draggable-resizable.vue';
import '../Draggable/components/vue-draggable-resizable.css';

export default {
  name: 'Main',
  components: {
    VueDraggableResizable,
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
  },
  methods: {
    onResizeImage(e, x, y, width, height) {
      if (e.target.parentElement.children[8]) {
        let element = e.target.parentElement.children[8];
        element.width = width;
        element.height = height;
      }
    },
    dragstop(key, left, top) {
      let payload = {
        left: (left * 100) / this.width,
        top: (top * 100) / this.height,
        elementId: key,
        idProject: this.$route.params.projectId,
      };
      this.$store.dispatch('element/updateElementPosition', payload);
    },
    onResizstop(key,e, x, y, width, height) {
        let payload = {
          width: (width * 100) / this.width,
          height: (height * 100) / this.height,
          left: (x * 100) / this.width,
          top: (y * 100) / this.height,
          elementId: key,
          idProject: this.$route.params.projectId,
        };
        this.$store.dispatch('element/updateElementSize', payload);
    },
    onActivated(id) {
      this.active = id;
    },
    onDeactivated() {
      this.active = null;
    },
  },
  computed: {
    listText() {
      let container = this.$store.state.element.template.elements[0];
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
        filter.map((element) => {
          element.heightE = (element.height * this.height) / 100;
          element.widthE = (element.width * this.width) / 100;
          element.xPositionE = (element.xPosition * this.width) / 100;
          element.yPositionE = (element.yPosition * this.height) / 100;
        });
        return filter;
      }
      return [];
    },
    listImages() {
      let container = this.$store.state.element.template.elements[0];
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
        filter.map((element) => {
          element.heightE = (element.height * this.height) / 100;
          element.widthE = (element.width * this.width) / 100;
          element.xPositionE = (element.xPosition * this.width) / 100;
          element.yPositionE = (element.yPosition * this.height) / 100;
        });
        return filter;
      }
      return [];
    },
    listButtons() {
      let container = this.$store.state.element.template.elements[0];
      console.log("Container",container)
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
        filter.map((element) => {
          element.heightE = (element.height * this.height) / 100;
          element.widthE = (element.width * this.width) / 100;
          element.xPositionE = (element.xPosition * this.width) / 100;
          element.yPositionE = (element.yPosition * this.height) / 100;
        });
        return filter;
      }
      return [];
    },
    listAudio() {
      let container = this.$store.state.element.template.elements[0];
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
        filter.map((element) => {
          element.heightE = (element.height * this.height) / 100;
          element.widthE = (element.width * this.width) / 100;
          element.xPositionE = (element.xPosition * this.width) / 100;
          element.yPositionE = (element.yPosition * this.height) / 100;
        });
        return filter;
      }
      return [];
    },
    listVideo() {
      let container = this.$store.state.element.template.elements[0];
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
        filter.map((element) => {
          element.heightE = (element.height * this.height) / 100;
          element.widthE = (element.width * this.width) / 100;
          element.xPositionE = (element.xPosition * this.width) / 100;
          element.yPositionE = (element.yPosition * this.height) / 100;
        });
        return filter;
      }
      return [];
    },
    listMenu() {
      let container = this.$store.state.element.template.elements[0];
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
        filter.map((element) => {
          element.heightE = (element.height * this.height) / 100;
          element.widthE = (element.width * this.width) / 100;
          element.xPositionE = (element.xPosition * this.width) / 100;
          element.yPositionE = (element.yPosition * this.height) / 100;
        });
        return filter;
      }
      return [];
    },
    listCustom() {
      let container = this.$store.state.element.template.elements[0];
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
        filter.map((element) => {
          element.heightE = (element.height * this.height) / 100;
          element.widthE = (element.width * this.width) / 100;
          element.xPositionE = (element.xPosition * this.width) / 100;
          element.yPositionE = (element.yPosition * this.height) / 100;
        });
        return filter;
      }
      return [];
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--first-color-editor);
  height: 100%;
  justify-content: space-between;
  padding: 2%;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin: 0.5%;
}
.video {
  align-items: center;
  margin: 2%;
  background-color: black;
  height: 100%;
}
.multimedia {
  display: flex;
  justify-content: center;
  width: 100%;
}
.multimedia img {
  width: 2%;
  margin: 0% 2%;
}
.comp {
  background-color: transparent;
}
.text2 {
  font-size: 30px;
  color: crimson;
}

.edit-element, .delete-element, .time-element {
  margin-top: -2rem;
  margin-left: 1em;
  text-align: center;
  position: absolute;
  font-size: 16px;
  color: var(--second-color);
  background-color: var(--first-color);
  width: 2rem;
  text-align: center;
  border-radius: 10px;
}

.delete-element {
  margin-left: 4em;
  color: var(--second-color);
  background-color: #E8463C;
}

.time-element {
  margin-left: 7em;
  color: var(--second-color);
  background-color: green;
}
</style>
