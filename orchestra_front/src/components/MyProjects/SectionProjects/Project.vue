<template>
  <article>
      <div class="image">
        <img src="@/assets/clipboard.png" alt="Icono de proyecto">
      </div>
      <div class="title">
          <p> <b> {{project.name}} </b></p>
          <p>Descripción : {{project.description}}</p>
          <p>Última modificación: {{project.lastModificationDate}}</p>
      </div>
      <div class="description">
          <p>Fecha : {{project.creationDate}}</p>
          <p>Numero de secciones : {{project.sectionsNumber}}</p>
          <p>Versión : {{project.version}}  </p>
          <p>Duración : {{project.duration}}</p> 
      </div>
      <div class="buttons">
        <button @click="$bvModal.show('Template'+project._id)" class="edit"><i class="fas fa-copy"></i></button>
        <ModalTemplate :name="project"/>
        <router-link :to="{name: 'PreviewProject', params: { id: project._id }}"> 
          <button class="edit" > <i class="far fa-edit"></i></button> 
        </router-link>
          <button class="delete" @click="$bvModal.show('ModalDelete'+project._id)"><i class="fas fa-trash-alt"></i></button>
          <ModalDelete :project="project"/>
      </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import ModalDelete from './ModalDelete.vue'
import ModalTemplate from './ModalTemplate.vue'
export default Vue.extend({
  name: 'Project',
  props: ['project'],
  components: {
    ModalDelete,
    ModalTemplate
  }
});
</script>

<style scoped>
article{
  display: flex;
  justify-content: space-around;
  padding: 2%;
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

.delete{
  color: var(--second-color);
  background-color: #E8463C;
}

</style>
