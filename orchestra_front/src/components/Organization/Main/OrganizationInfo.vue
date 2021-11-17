<template>
    <article>
      <div class="image">
        <img src="@/assets/org.png" alt="Icono de organización">
      </div>
      <div class="title">
          <p> <b> {{organization.name}}  </b></p>
          <p>Pais : {{organization.country}} </p>
          <p>Nit: {{organization.nit}}</p>
          <p>Numero: {{organization.phoneNumber}}</p>
         
      </div>
      <div class="description">
          <a :href="'//'+ organization.facebookUrl" target="_blank">
              <i class="fab fa-facebook"></i>
          </a>
          <a :href="'//'+ organization.twitterUrl" target="_blank"> 
              <i class="fab fa-twitter"></i>
          </a>
          <a :href="'//'+ organization.website" target="_blank">    
              <i class="fas fa-globe"></i>
          </a>
      </div>
      <div class="buttons">
        <button class="edit" > <i class="far fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>
  </article>
</template>

<script>
export default {
    name: 'OrganizationInfo',
    props: ['organization'],
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
.delete{
  color: var(--second-color);
  background-color: #E8463C;
}

.description i{
    font-size: 2rem;
}

</style>