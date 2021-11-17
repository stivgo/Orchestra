<template>
  <section>
    <article class="title">
      <p>Capas</p>
      <button @click="$bvModal.show('new-layer')">+</button>
      <ModalNewLayer/>
    </article>
    <article v-for="(layer, key) of container" :key="layer._id" :class="key%2 == 0 ? 'first' : 'second'">
      <i v-if="layer.isVisible" class="fas fa-eye" @click="showLayer(layer._id, false)"></i>
      <i v-else class="fas fa-eye-slash" @click="showLayer(layer._id, true)"></i>
      <p>{{layer.title}}</p>
      <i v-if="layer.isLocked" class="far fa-lock-alt" @click="lockLayer(layer._id, false)"></i>
      <i v-else class="far fa-lock-open-alt" @click="lockLayer(layer._id, true)"></i>
      <i class="fas fa-trash-alt" @click="$bvModal.show('delete-layer'+layer._id)" v-if="layer.title != 'Default Layer'"></i>
      <ModalDeleteLayer :element="layer"/>
    </article>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import ModalNewLayer from './Layers/ModalNewLayer.vue'
import ModalDeleteLayer from './Layers/ModalDeleteLayer.vue'
export default Vue.extend({
  name: 'Layers',
  components: {
    ModalNewLayer,
    ModalDeleteLayer
  },
  methods:{
    showLayer(id:any, state:any){
      let payload = {
        elementId: id,
        state: state,
        idProject: this.$route.params.projectId,
      };
      this.$store.dispatch('element/updateLayerVisible', payload);
    },
    lockLayer(id:any, state:any){
      let payload = {
        elementId: id,
        state: state,
        idProject: this.$route.params.projectId,
      };
      this.$store.dispatch('element/updateLayerLocked', payload);
    },
  },
  computed:{
    container(){
      if (this.$store.state.element.elements[0]) 
        return this.$store.state.element.elements[0].childElements
      return []
    }
  }
});
</script>

<style scoped>

section {
  display: flex;
  flex-direction: column;
  color: var(--third-color);
  background-color: var(--third-color-editor);
  height: 100%;
  overflow-y: scroll;
}

section::-webkit-scrollbar-track {
  /* border: 1px solid #000; */
  padding: 2px 0;
  background-color: #404040;
}

section::-webkit-scrollbar {
  width: 5px;
}

section::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: white;
  border: 1px solid #000;
}
.title{
  display: flex;
  justify-content: space-around;
  height: 1.5rem;
}

.title button{
  background: none;
  color: var(--third-color);
  font-size: 20px;
  line-height:normal;
}

.first, .second {
  background-color: var(--first-color-editor);
  display: flex;
  align-items: center;
  height: 1.5rem;
  justify-content: space-between;
}

.second {
  background-color: var(--second-color-editor);
}


.first img, .second img {
  width: 1rem;
  margin: 0 1rem;
  cursor: pointer;
}

i{
  margin-right: 1rem;
  margin-left: 1rem;
  cursor: pointer;
}

.first div, .second div {
  display: flex;
}

p{
  margin: 0;
  padding: 0;
}

</style>
