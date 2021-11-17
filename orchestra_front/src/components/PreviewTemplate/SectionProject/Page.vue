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
        <button class="edit" @click="changeToEditor" >  <i class="fas fa-eye"></i></button> 
      </div>
  </article>
</template>

<script >
import {convertTimeElement} from '@/utils/utils'
export default{
  name: 'Page',
  props: ['page','section'],
  data(){
    return{
     endTime: '',
    } },
  mounted(){
    console.log(this.page)
    this.convertTime()
  },
  
  methods:{
    convertTime(){
     this.endTime = convertTimeElement(this.page.endTime)
    },
    changeToEditor(){
      this.$store.commit('element/SET_TEMPLATE', this.page)
      this.$router.push({name: 'TemplateEditor', params: {  }}).catch(err => {
        console.log(err)
      })
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
