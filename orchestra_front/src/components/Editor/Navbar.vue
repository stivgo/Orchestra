<template>
  <nav>
      <div>
          <router-link to="/">
            <img src="@/assets/Editor/logo-orchestra.png" alt="Logo Orchesta">
          </router-link>
      </div>
      <div class="items">
          <!-- <button>
              <img src="@/assets/Editor/logo-plantillas.png" alt="Logo plantillas"> 
              <p>Plantillas</p>
          </button>
          <button>
              <img src="@/assets/Editor/logo-plantillas.png" alt="Logo galerias"> 
              <p>Galerias</p>
          </button>
          <button>
              <img src="@/assets/Editor/logo-plantillas.png" alt="Logo contenedor"> 
              <p>Contenedor</p>
          </button> -->
          <button @click="$bvModal.show('insert-text')">
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo texto"> -->
              <i class="fas fa-text"></i>
              <p>Texto</p>
          </button>
          <InsertText/>
          <button @click="$bvModal.show('insert-image')">
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo imágenes"> -->
              <i class="fas fa-image"></i>
              <p>Imágen</p>
          </button>
          <InsertImage/>
          <button @click="$bvModal.show('insert-button')">
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo botones"> -->
              <i class="fas fa-rectangle-wide"></i>
              <p>Botones</p>
          </button>
          <InsertButton/>
          <button @click="$bvModal.show('insert-menu')">
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo Menú"> -->
              <i class="far fa-images"></i>
              <p>Carrusel</p>
          </button>
          <InsertMenu/>
          <button @click="$bvModal.show('insert-audio')">
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo Audio"> -->
              <i class="fas fa-volume-up"></i>
              <p>Audio</p>
          </button>
          <InsertAudio/>
          <button @click="$bvModal.show('insert-video')">
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo Video"> -->
              <i class="fas fa-video"></i>
              <p>Video</p>
          </button>
          <InsertVideo/>
          <button @click="$bvModal.show('insert-custom')">
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo Custom Element"> -->
              <i class="fab fa-elementor"></i>
              <p>Elemento Personalizado</p>
          </button>
          <InsertCustomElement/>
          <button @click="$bvModal.show('insert-link')">
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo Custom Element"> -->
              <i class="fas fa-link"></i>
              <p>Enlace</p>
          </button>
          <InsertLink/>
      </div>
      <div class="help">
          <router-link to="/FAQ">Ayuda</router-link>
      </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import InsertText from '../Global/ModalElements/Text/InsertText.vue'
import InsertImage from '../Global/ModalElements/Image/InsertImage.vue'
import InsertButton from '../Global/ModalElements/Button/InsertButton.vue'
import InsertCustomElement from '../Global/ModalElements/CustomElement/InsertCustomElement.vue'
import InsertAudio from '../Global/ModalElements/Audio/InsertAudio.vue'
import InsertVideo from '../Global/ModalElements/Video/InsertVideo.vue'
import InsertMenu from '../Global/ModalElements/Menu/InsertMenu.vue'
import InsertLink from '../Global/ModalElements/Link/InsertLink.vue'
export default Vue.extend({
  name: 'Navbar',
  components:{
      InsertText,
      InsertImage,
      InsertButton,
      InsertCustomElement,
      InsertAudio,
      InsertVideo,
      InsertMenu,
      InsertLink
  },
  methods:{
    
  }
  
});
</script>

<style scoped>
nav{
    display: flex;
    flex-direction: column;
    background-color: var(--first-color-editor);
    height: 100%;
    width: 100%;
    justify-content: space-between;
    margin: 0;
}
button{
    background: none;
}
p{
    color: var(--third-color);
    text-align: center;
    margin:0;
}
img{
    width: 100%;
}
.items{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.items img{
    width: 2rem;
}

.items button{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0;
}

.items button:hover{
    background-color: var(--second-color-editor);
}

.items i{
    color: white;
    font-size: 20px;
}

a{
    text-decoration: none;
    color: white;
}

.help{
    display: flex;
    justify-content: center;
}

</style>