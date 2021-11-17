<template>
  <nav>
      <div>
          <router-link to="/">
            <img src="@/assets/Editor/logo-orchestra.png" alt="Logo Orchesta">
          </router-link>
      </div>
      <div class="items">
          <button @click="$bvModal.show('insert-text')">
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo texto"> -->
              <i class="fas fa-text"></i>
              <p>Texto</p>
          </button>
          <InsertText :custom="true"/>
          <button @click="$bvModal.show('insert-image')">
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo imágenes"> -->
              <i class="fas fa-image"></i>
              <p>Imágen</p>
          </button>
          <InsertImage :custom="true"/>
          <button @click="$bvModal.show('insert-button')">
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo botones"> -->
              <i class="fas fa-rectangle-wide"></i>
              <p>Botones</p>
          </button>
          <InsertButton :custom="true"/>
          <button>
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo Menú"> -->
              <i class="far fa-images"></i>
              <p>Carrusel</p>
          </button>
          <button>
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo Audio"> -->
              <i class="fas fa-volume-up"></i>
              <p>Audio</p>
          </button>
          <button>
              <!-- <img src="@/assets/Editor/logo-plantillas.png" alt="Logo Video"> -->
              <i class="fas fa-video"></i>
              <p>Video</p>
          </button>
      </div>
      <div>
          <router-link to="/FAQ">Ayuda</router-link>
      </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import InsertText from '../Global/ModalElements/Text/InsertText.vue'
import InsertImage from '../Global/ModalElements/Image/InsertImage.vue'
import InsertButton from '../Global/ModalElements/Button/InsertButton.vue'
export default Vue.extend({
  name: 'Navbar',
  components:{
      InsertText,
      InsertImage,
      InsertButton
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
