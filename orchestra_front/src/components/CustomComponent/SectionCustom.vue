<template>
  <section>
    <div class="title">
      <router-link :to="{name: 'PreviewProject', params: { id: projectId }}">  <i class="fal fa-arrow-left"></i> Volver</router-link>
      <h1>Mis elementos personalizados</h1>
      <button @click="$bvModal.show('modal-create')">Crear elemento personalizado</button>
      <ModalCreate/>
    </div>
    <article v-for="element of customComponents" :key="element._id">
      <div class="description"> 
        <h2>{{element.name}}</h2>
        <p>{{element.description}}</p>
      </div>
      <div class="buttons">
        <button @click="$bvModal.show('edit-info'+element._id)" class="edit"><i class="fas fa-info"></i></button>
        <ModalEditInfo :element="element" />
        <router-link :to="{name: 'customComponentEditor', params: { projectId: projectId, customId:element._id }}"> 
          <button class="edit" > <i class="far fa-edit"></i></button> 
        </router-link>
        <button @click="$bvModal.show('delete-custom'+element._id)" class="delete"><i class="fas fa-trash-alt"></i></button>
        <ModalDelete :element="element"/>
      </div>
    </article>
  </section>
</template>

<script>
import ModalCreate from './ModalCreate.vue'
import ModalEditInfo from './ModalEditInfo.vue'
import ModalDelete from './ModalDelete.vue'
export default {
  name: 'SectionCustom',
  components:{
    ModalCreate,
    ModalEditInfo,
    ModalDelete
  },
  data: function () {
    return {
      projectId: null,
    }
  },
  async created() {
    await this.$store.dispatch('element/getCustomComponents', this.$route.params.projectId);
    this.projectId = this.$route.params.projectId
  },
  computed: {
    customComponents: function () {
      return this.$store.state.element.customComponents ? this.$store.state.element.customComponents : [] ;
    },
  },

}
</script>

<style scoped>

section{
  overflow-y: scroll;
  width: 100%;
  height: 80vh;
}

article{
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 2%;
}

button{
  color: var(--second-color);
  background-color: var(--first-color);
  font-weight: 600;
  padding: 0.5% 1%;
  border-radius: 20px;
}

.title{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1%;
}

.title a{
  text-decoration: none;
}

article .buttons{
  width: 25%;
  display: flex;
  flex-direction: column;
}

article .description{
  margin-left: 5%;
}

.edit, .delete{
  color: var(--second-color);
  background-color: var(--first-color);
  width: 50%;
  padding: 2%;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 1%;
}

.delete{
  color: var(--second-color);
  background-color: #E8463C;
}


</style>