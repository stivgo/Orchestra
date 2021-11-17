<template>
 <article>
      <div class="image">
        <img src="@/assets/mockup.png" alt="Icono de template">
      </div>
      <div class="title">
          <p> <b> {{template.name}} </b></p>
          <p>Descripción : {{template.description}}</p>
         
      </div>
      <div class="description">
           <p>Fecha de creación: {{template.creationDate}}</p>
          <p>Creador: {{user}}</p>
      </div>
      <div class="buttons">
          <button class="edit" @click="$bvModal.show('Modal'+template._id)"><i class="fas fa-plus"></i></button>
          <ModalProject :name="template._id" :template="true"/>
        <router-link :to="{name: 'PreviewTemplate', params: { id: template._id }}"> 
          <button class="edit"> <i class="fas fa-eye"></i></button> 
        </router-link>
      </div>
  </article>
  
</template>

<script>
import ModalProject from '@/components/Global/ModalProject.vue'
export default {
    name: 'TemplateInfo',
    props: ['template'],
    components: {
        ModalProject
    },
    mounted() {this.$store.state.project.user
      this.$store.dispatch("project/getUser", this.template.creator);
    },
    computed: {
     user() {
         if (this.$store.state.project.user){
      let info = this.$store.state.project.user
      return info.firstName + ' ' + info.lastName
         }
         return ''
     }
    },

}
</script>

<style scoped>

p{
    margin: 0;
}

article{
  display: flex;
  justify-content: space-between;
  padding: 2%;
  margin-left: 3rem;
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
}

</style>