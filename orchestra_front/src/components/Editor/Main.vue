<template>
  <main>
    <div class="buttons">
      <router-link :to="{name: 'Render', params: { projectId: $route.params.projectId,
       pageId: $route.params.pageId}}"> 
        Render 
      </router-link>
      <router-link :to="{name: 'Render', params: { projectId: $route.params.projectId,
       pageId: $route.params.pageId}, query: {export: 'true'} }"> 
        Exportar 
      </router-link>
    </div>
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
        :resizable="!element.isLocked"
        :draggable="!element.isLocked"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id, element)"
        @deactivated="onDeactivated(element)"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <button v-if="active === element._id" class="edit-element"
          @click="$bvModal.show('edit-button'+element._id)"
        >
          <i class="far fa-edit"></i>
        </button>
        <EditButton :element="element"/>
        <button v-if="active === element._id" class="delete-element"
          @click="$bvModal.show('delete-button'+element._id)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <DeleteButton :element="element"/>
        <button v-if="active === element._id && element.isStatic" class="time-element"
          @click="$bvModal.show('insert-element-time'+element._id)"
        >
         <i class="far fa-clock"></i>
        </button>
        <ModalTimeLine :element="element"/>
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
        :resizable="!element.isLocked"
        :draggable="!element.isLocked"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id, element)"
        @deactivated="onDeactivated(element)"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <button v-if="active === element._id" class="edit-element"
          @click="$bvModal.show('edit-image'+element._id)"
        >
          <i class="far fa-edit"></i>
        </button>
        <EditImage :element="element"/>
        <button v-if="active === element._id" class="delete-element"
          @click="$bvModal.show('delete-image'+element._id)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <DeleteImage :element="element"/>
        <button v-if="active === element._id && element.isStatic" class="time-element"
          @click="$bvModal.show('insert-element-time'+element._id)"
        >
         <i class="far fa-clock"></i>
        </button>
        <ModalTimeLine :element="element"/>
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
        :resizable="!element.isLocked"
        :draggable="!element.isLocked"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id, element)"
        @deactivated="onDeactivated(element)"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <button v-if="active === element._id" class="edit-element"
          @click="$bvModal.show('edit-text'+element._id)"
        >
          <i class="far fa-edit"></i>
        </button>
        <EditText :element="element"/>
        <button v-if="active === element._id" class="delete-element"
          @click="$bvModal.show('delete-text'+element._id)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <DeleteText :element="element"/>
        <button v-if="active === element._id && element.isStatic" class="time-element"
          @click="$bvModal.show('insert-element-time'+element._id)"
        >
         <i class="far fa-clock"></i>
        </button>
        <ModalTimeLine :element="element"/>
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
        :resizable="!element.isLocked"
        :draggable="!element.isLocked"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id, element)"
        @deactivated="onDeactivated(element)"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <button v-if="active === element._id" class="edit-element"
          @click="$bvModal.show('edit-audio'+element._id)"
        >
          <i class="far fa-edit"></i>
        </button>
        <EditAudio :element="element"/>
        <button v-if="active === element._id" class="delete-element"
          @click="$bvModal.show('delete-audio'+element._id)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <DeleteAudio :element="element"/>
        <button v-if="active === element._id && element.isStatic" class="time-element"
          @click="$bvModal.show('insert-element-time'+element._id)"
        >
         <i class="far fa-clock"></i>
        </button>
        <ModalTimeLine :element="element"/>
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
        :resizable="!element.isLocked"
        :draggable="!element.isLocked"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id, element)"
        @deactivated="onDeactivated(element)"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <button v-if="active === element._id" class="edit-element"
          @click="$bvModal.show('edit-video'+element._id)"
        >
          <i class="far fa-edit"></i>
        </button>
        <EditVideo :element="element"/>
        <button v-if="active === element._id" class="delete-element"
          @click="$bvModal.show('delete-video'+element._id)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <DeleteVideo :element="element"/>
        <button v-if="active === element._id && element.isStatic" class="time-element"
          @click="$bvModal.show('insert-element-time'+element._id)"
        >
         <i class="far fa-clock"></i>
        </button>
        <ModalTimeLine :element="element"/>
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
        :resizable="!element.isLocked"
        :draggable="!element.isLocked"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id, element)"
        @deactivated="onDeactivated(element)"
        :style="element.isVisible ? '' : 'display:none;' "
      >
        <button v-if="active === element._id" class="edit-element"
          @click="$bvModal.show('edit-menu'+element._id)"
        >
          <i class="far fa-edit"></i>
        </button>
        <EditMenu :element="element"/>
        <button v-if="active === element._id" class="delete-element"
          @click="$bvModal.show('delete-menu'+element._id)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <DeleteMenu :element="element"/>
        <button v-if="active === element._id && element.isStatic" class="time-element"
          @click="$bvModal.show('insert-element-time'+element._id)"
        >
         <i class="far fa-clock"></i>
        </button>
        <ModalTimeLine :element="element"/>
        <div class="slide-container">
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
      </vue-draggable-resizable>

      <vue-draggable-resizable
        class="comp"
        class-name-active="my-active-class"
        :parent="true"
        v-for="element in listLink"
        :key="element._id"
        :x="element.xPositionE"
        :y="element.yPositionE"
        :z="element.zPosition"
        :w="element.widthE"
        :h="element.heightE"
        :resizable="!element.isLocked"
        :draggable="!element.isLocked"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id, element)"
        @deactivated="onDeactivated(element)"
        :style="(element.isVisible ? '' : 'display:none;') + element.stylesString "
      >
        <button v-if="active === element._id" class="edit-element"
          @click="$bvModal.show('edit-link'+element._id)"
        >
          <i class="far fa-edit"></i>
        </button>
        <EditLink :element="element"/>
        <button v-if="active === element._id" class="delete-element"
          @click="$bvModal.show('delete-link'+element._id)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <DeleteLink :element="element"/>
        <button v-if="active === element._id && element.isStatic" class="time-element"
          @click="$bvModal.show('insert-element-time'+element._id)"
        >
         <i class="far fa-clock"></i>
        </button>
        <ModalTimeLine :element="element"/>
        <a :href="'//'+element.urlSource" :style="element.stylesString+'width:100%; height:100%;pointer-events: none'"> {{element.content}}  </a>
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
        :resizable="!element.isLocked"
        :draggable="!element.isLocked"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
        @resizestop="(e, x, y, width, height) => onResizstop(element._id,e, x, y, width, height)"
        @activated="onActivated(element._id, element)"
        @deactivated="onDeactivated(element)"
        :style="(element.isVisible ? '' : 'display:none;') + element.stylesString"
      >
        <button v-if="active === element._id" class="edit-element"
        @click="$bvModal.show('edit-custom'+element._id)"
        >
          <i class="far fa-edit"></i>
        </button>
        <EditCustomElement :element="element"/>
        <button v-if="active === element._id" class="delete-element"
          @click="$bvModal.show('delete-custom'+element._id)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <DeleteCustomElement :element="element"/>
        <button v-if="active === element._id && element.isStatic" class="time-element"
          @click="$bvModal.show('insert-element-time'+element._id)"
        >
         <i class="far fa-clock"></i>
        </button>
        <ModalTimeLine :element="element"/>

        <div 
           v-for="(item,index) of element.childComponents" :key="element._id+index"
           :style="item.stylesString+'width:'+item.width+'%;'+'height:'+item.height+'%;'+
          'z-index:'+item.zPosition+';top:'+item.yPosition+'%;left:'+item.xPosition+'%;position:absolute;'"
           >
              <vue-draggable-resizable
                class="comp"
                class-name-active="my-active-class"
                :parent="true"
                :key="item._id"
                :resizable="false"
                :draggable="false"
                @activated="onActivated(item._id)"
                @deactivated="onDeactivated"
                style="'width:100%;height:100%;'"
              >
              <button v-if="active === item._id && item.type == 'Paragraph'" class="edit-element"
                @click="$bvModal.show('edit-text'+item.indexS)"
              >
                <i class="far fa-edit"></i>
              </button>
              <EditText :element="item" v-if="item.type == 'Paragraph'"/>
              <p v-if="item.type == 'Paragraph'" :style="item.stylesString+'width:100%; height:100%'">{{item.content}} </p>
              
              <button v-if="active === item._id && item.type == 'Image'" class="edit-element"
                @click="$bvModal.show('edit-image'+item.indexS)"
              >
                <i class="far fa-edit"></i>
              </button>
              <EditImage v-if="item.type == 'Image'" :element="item"/>
              <img v-if="item.type == 'Image'" :src="item.urlSource" :alt="item.alternativeText" :style="item.stylesString+'width:100%; height:100%'">
              
              <button v-if="active === item._id && item.type == 'Button'" class="edit-element"
                @click="$bvModal.show('edit-button'+item.indexS)"
              >
                <i class="far fa-edit"></i>
              </button>
              <EditButton :element="item" v-if="item.type == 'Button'"/>
              
              <button v-if="item.type == 'Button'" :style="item.stylesString+'width:100%; height:100%'"> 
                {{item.content}}
              </button>

             </vue-draggable-resizable>

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
import EditText from '../Global/ModalElements/Text/EditText.vue'
import DeleteText from '../Global/ModalElements/Text/DeleteText.vue'
import EditButton from '../Global/ModalElements/Button/EditButton.vue'
import DeleteButton from '../Global/ModalElements/Button/DeleteButton.vue'
import EditImage from '../Global/ModalElements/Image/EditImage.vue'
import DeleteImage from '../Global/ModalElements/Image/DeleteImage.vue'
import EditAudio from '../Global/ModalElements/Audio/EditAudio.vue'
import DeleteAudio from '../Global/ModalElements/Audio/DeleteAudio.vue'
import EditVideo from '../Global/ModalElements/Video/EditVideo.vue'
import DeleteVideo from '../Global/ModalElements/Video/DeleteVideo.vue'
import EditMenu from '../Global/ModalElements/Menu/EditMenu.vue'
import DeleteMenu from '../Global/ModalElements/Menu/DeleteMenu.vue'
import EditCustomElement from '../Global/ModalElements/CustomElement/EditCustomElement.vue'
import DeleteCustomElement from '../Global/ModalElements/CustomElement/DeleteCustomElement.vue'
import EditLink from '../Global/ModalElements/Link/EditLink.vue'
import DeleteLink from '../Global/ModalElements/Link/DeleteLink.vue'

import ModalTimeLine from '../Global/ModalTimeLine.vue'

export default {
  name: 'Main',
  components: {
    VueDraggableResizable,
    EditText,
    DeleteText,
    EditButton,
    DeleteButton,
    EditImage,
    DeleteImage,
    EditAudio,
    DeleteAudio,
    EditVideo,
    DeleteVideo,
    EditMenu,
    DeleteMenu,
    ModalTimeLine,
    EditCustomElement,
    DeleteCustomElement,
    EditLink,
    DeleteLink
  },
  async created() {
    let payload = {
      idProject: this.$route.params.projectId,
      idPage:    this.$route.params.pageId,
    };
    await this.$store.dispatch('element/getElementsByPage', payload);
  },
  data() {
    return {
      newTask: '',
      height: 0,
      width: 0,
      active: null,
      zPositionActive : 0,
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
    onActivated(id,element) {
      this.active = id;
      this.zPositionActive = element.zPosition;
      element.zPosition = 100;
    },
    onDeactivated(element) {
      element.zPosition = this.zPositionActive;
      this.active = null;
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
        filter.map((element) => {
          element.heightE = (element.height * this.height) / 100;
          element.widthE = (element.width * this.width) / 100;
          element.xPositionE = (element.xPosition * this.width) / 100;
          element.yPositionE = (element.yPosition * this.height) / 100;
        });
        filter.map((element) => {
          element.childComponents.map((item, index) => {
            item.indexS = item._id+index.toString()
          });
        });
        console.log("Filter custom", filter)
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
  height: 80%;
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
  z-index: 100;
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
