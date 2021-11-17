<template>
  <article>
      <div class="image">
        <img src="@/assets/page.png" alt="Icono de pagina">
      </div>
      <div class="title">
          <p> <b> {{page.name}} </b></p>
          <p>Descripción : {{page.description}}</p>
          <p>Última modificación: 24/11/2012</p>
      </div>
      <div class="description">
          <p>Fecha: 24/10/2011</p>
          <p>Duración: {{endTime}}</p> 
      </div>
      <div class="buttons">
        <button @click="$bvModal.show('ModalEditPage'+page._id)" class="edit"><i class="fas fa-info"></i></button>
        <ModalEditPage :page="page" :section="section" @update-project="updateProject" />
        <router-link :to="{name: 'Editor', params: { pageId: page._id,sectionId: section._id ,projectId:project._id }}"> 
          <button class="edit" > <i class="far fa-edit"></i></button> 
        </router-link>
        <button @click="$bvModal.show('ModalDeletePage'+page._id)" class="delete"><i class="fas fa-trash-alt"></i></button>
        <ModalDeletePage :page="page" :section="section" @update-project="updateProject"/>
      </div>
  </article>
</template>

<script >
import ModalDeletePage from './ModalDeletePage.vue'
import ModalEditPage from './ModalEditPage.vue'
import {convertTimeElement} from '@/utils/utils'
export default{
  name: 'Page',
  props: ['page','section'],
  components:{
    ModalDeletePage,
    ModalEditPage
  },
  data(){
    return{
     endTime: '',
    } },
  mounted(){
    this.convertTime()
  },
  
  methods:{
    updateProject(){
      this.$emit('update-project')
      this.convertTime()
    },
    convertTime(){
     this.endTime = convertTimeElement(this.page.endTime)
    }
  },
  computed: {
    project() {
      return this.$store.state.project.project;
    }
  },
  
};
</script>

<style scoped>
article{
  display: flex;
  justify-content: space-around;
  padding: 2%;
  width: 100%;
}

article .image{
  width: 100px;
  height: 100px;
}

.image img{
  width: 100%;
}

article .title{
  width: 25%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

article .description{
  width: 25%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

article .buttons{
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.edit, .delete{
  color: var(--second-color);
  background-color: var(--first-color);
  width: 50%;
  padding: 2%;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease-in-out;
}

.delete{
  color: var(--second-color);
  background-color: #E8463C;
}

.edit:hover{
  background-position: right center; /* change the direction of the change here */
  background: linear-gradient(180deg, #8a64eb 0%, rgba(255, 255, 255, 0) 100%), #64e8de;
  transition: all 0.3s ease-in-out;
}
</style>
