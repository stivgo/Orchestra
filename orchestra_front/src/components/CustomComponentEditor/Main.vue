<template>
  <main>
    <div class="video" id="video" >
      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        :key="custom._id"
        :w="custom.widthE"
        :h="custom.heightE"
        :resizable="true"
        :draggable="false"
        :z="0"
        id = "custom"
        @resizestop="(e, x, y, width, height) => onResizstopCustom(custom._id,e, x, y, width, height)"
        v-if="custom"
      >
      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        v-for="element in listButtons"
        :key="element._id+element.xPositionE+element.widthE+element.heightE"
        :x="element.xPositionE"
        :y="element.yPositionE"
        :z="element.zPosition"
        :w="element.widthE"
        :h="element.heightE"
        :resizable="true"
        :onResize="onResizeImage"
        @activated="onActivated(element.index)"
        @deactivated="onDeactivated"
        @resizestop="(e, x, y, width, height) => onResizstop(element.index,e, x, y, width, height)"
        @dragstop="(left, top) => dragstop(element.index, left, top)"
      >
        <button v-if="active === element.index" class="edit-element"
          @click="$bvModal.show('edit-button'+element.indexS)"
        >
          <i class="far fa-edit"></i>
        </button>
        <EditButton :element="element" :custom="true" :index="element.index" :customElement="custom"/>
        <button v-if="active === element.index" class="delete-element"
          @click="$bvModal.show('delete-button'+element.indexS)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <DeleteButton :element="element" :custom="true" :index="element.index" :customElement="custom"/>
        <button  :id="element._id" :style="element.stylesString+'width:100%; height:100%'">
          {{ element.content }}
        </button>
      </vue-draggable-resizable>

      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        v-for="element in listImages"
        :key="element._id+element.xPositionE+element.widthE+element.heightE"
        :x="element.xPositionE"
        :y="element.yPositionE"
        :z="element.zPosition"
        :w="element.widthE"
        :h="element.heightE"
        :resizable="true"
        :onResize="onResizeImage"
        @activated="onActivated(element.index)"
        @deactivated="onDeactivated"
        @resizestop="(e, x, y, width, height) => onResizstop(element.index,e, x, y, width, height)"
        @dragstop="(left, top) => dragstop(element.index, left, top)"
      >
        <button v-if="active === element.index" class="edit-element"
          @click="$bvModal.show('edit-image'+element.indexS)"
        >
          <i class="far fa-edit"></i>
        </button>
        <EditImage :element="element" :custom="true" :index="element.index" :customElement="custom"/>
        <button v-if="active === element.index" class="delete-element"
          @click="$bvModal.show('delete-image'+element.indexS)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <DeleteImage :element="element" :custom="true" :index="element.index" :customElement="custom"/>
        <img :src="element.urlSource" :alt="element.alternativeText" :id="element._id" 
          :style="element.stylesString+'width:100%; height:100%'"  />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        v-for="element in listText"
        :key="element._id+element.xPositionE+element.widthE+element.heightE"
        :x="element.xPositionE"
        :y="element.yPositionE"
        :z="element.zPosition"
        :w="element.widthE"
        :h="element.heightE"
        :resizable="true"
        :onResize="onResizeImage"
        @activated="onActivated(element.index)"
        @deactivated="onDeactivated"
        @resizestop="(e, x, y, width, height) => onResizstop(element.index,e, x, y, width, height)"
        @dragstop="(left, top) => dragstop(element.index, left, top)"
      >
        <button v-if="active === element.index" class="edit-element"
          @click="$bvModal.show('edit-text'+element.indexS)"
        >
          <i class="far fa-edit"></i>
        </button>
        <EditText :element="element" :custom="true" :index="element.index" :customElement="custom"/>
        <button v-if="active === element.index" class="delete-element"
          @click="$bvModal.show('delete-text'+element.indexS)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <DeleteText :element="element" :custom="true" :index="element.index" :customElement="custom"/>
        <p :style="element.stylesString+'width:100%; height:100%'" :id="element._id">
          {{ element.content }}
        </p>
        
      </vue-draggable-resizable>
    </vue-draggable-resizable>
    </div>
  </main>
</template>

<script>
import VueDraggableResizable from '../Draggable/components/vue-draggable-resizable.vue';
import '../Draggable/components/vue-draggable-resizable.css';
import EditText from '../Global/ModalElements/Text/EditText.vue'
import DeleteText from '../Global/ModalElements/Text/DeleteText.vue'
import EditButton from '../Global/ModalElements/Button/EditButton.vue'
import DeleteButton from '../Global/ModalElements/Button/DeleteButton.vue'
import EditImage from '../Global/ModalElements/Image/EditImage.vue'
import DeleteImage from '../Global/ModalElements/Image/DeleteImage.vue'

export default {
  name: 'Main',
  components: {
    VueDraggableResizable,
    EditText,
    DeleteText,
    EditButton,
    DeleteButton,
    EditImage,
    DeleteImage
  },
  async created() {
    await this.$store.dispatch('element/getCustomById', this.$route.params.customId);
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
    this.width  = video.clientWidth;
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
      let custom = document.getElementById('custom');
      let payload = {...this.custom}
      payload.childComponents[key].xPosition = (left * 100) / custom.clientWidth
      payload.childComponents[key].yPosition = (top * 100) / custom.clientHeight
      this.$store.dispatch('element/updateElementCustomSize', payload);
    },
    onResizstop(key,e, x, y, w, h) {
        let custom = document.getElementById('custom');
        let width= (w * 100) / custom.clientWidth
        let height= (h * 100) / custom.clientHeight
        let payload = {...this.custom}
        payload.childComponents[key].width = width
        payload.childComponents[key].height = height
        this.$store.dispatch('element/updateElementCustomSize', payload);
    },
    onResizstopCustom(key,e, x, y, width, height) {
        this.custom.defaultWidth = (width * 100) / this.width
        this.custom.defaultHeight = (height * 100) / this.height
        let payload = {...this.custom}
        payload.childComponents = [...this.custom.childComponents]
        this.$store.dispatch('element/updateElementCustomSize', payload);
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
      let container = this.$store.state.element.customComponent.childComponents;
      let custom = document.getElementById('custom');
      if (container && custom) {
        let filter = [] 
        const filter2 = container.filter(
          (element) => element.type === 'Paragraph'
        );
        filter = filter.concat(filter2)
        
        filter.map((element) => {
          element.heightE = (element.height * custom.clientHeight) / 100;
          element.widthE = (element.width * custom.clientWidth) / 100;
          element.xPositionE = (element.xPosition * custom.clientWidth) / 100;
          element.yPositionE = (element.yPosition * custom.clientHeight) / 100;
        });
        return filter;
      }
      return [];
    },
    listImages() {
      let container = this.$store.state.element.customComponent.childComponents;
      let custom = document.getElementById('custom');
      if (container && custom) {
        let filter = [] 
        const filter2 = container.filter(
          (element) => element.type === 'Image'
        );
        filter = filter.concat(filter2)
        
        filter.map((element) => {
          element.heightE = (element.height * custom.clientHeight) / 100;
          element.widthE = (element.width * custom.clientWidth) / 100;
          element.xPositionE = (element.xPosition * custom.clientWidth) / 100;
          element.yPositionE = (element.yPosition * custom.clientHeight) / 100;
        });
        return filter;
      }
      return [];
    },
    listButtons() {
      let container = this.$store.state.element.customComponent.childComponents;
      let custom = document.getElementById('custom');
      if (container && custom) {
        let filter = [] 
        const filter2 = container.filter(
          (element) => element.type === 'Button'
        );
        filter = filter.concat(filter2)
        
        filter.map((element) => {
          element.heightE = (element.height * custom.clientHeight) / 100;
          element.widthE = (element.width * custom.clientWidth) / 100;
          element.xPositionE = (element.xPosition * custom.clientWidth) / 100;
          element.yPositionE = (element.yPosition * custom.clientHeight) / 100;
        });
        return filter;
      }
      return [];
    },
    custom(){
      let custom = this.$store.state.element.customComponent ? this.$store.state.element.customComponent : null 
      if(custom){
        custom.heightE = (custom.defaultHeight * this.height) / 100;
        custom.widthE =  (custom.defaultWidth * this.width) / 100;
      }
      return custom
      
    }
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
  background-color: blue;
}
.text2 {
  font-size: 30px;
  color: crimson;
}

.edit-element, .delete-element {
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
  margin-left: 5em;
  color: var(--second-color);
  background-color: #E8463C;
}
</style>
