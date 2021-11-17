<template>
    <div class="main">
        <div class="title">
            <h1>Mis organizaciones</h1>
            <button class="new-org" @click="$bvModal.show('ModalOrganization')">
                Crear nueva organización
            </button>
            <ModalOrganization :name="'Organization'"/>
        </div>
        <div class="main">
          <OrganzationInfo v-for="(organization) in organizations" :key="organization._id" :organization="organization" />
        </div>
    </div>
</template>

<script>
import OrganzationInfo from './Main/OrganizationInfo.vue'
import ModalOrganization from '@/components/Global/ModalOrganization.vue';
export default {
    name: 'Main',
    components: {
        ModalOrganization,
        OrganzationInfo
    },
    mounted() {
        this.$store.dispatch("session/getOrganizations");
    },
    computed: {
        organizations() {
            return this.$store.state.session.organizations;
        }
    },

}
</script>

<style scoped>
.main{
    display: flex;
    flex-direction: column;
      overflow-y: scroll;
  width: 100%;
  height: 80vh;
}

.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.new-org{
    color: var(--second-color);
    background-color: var(--first-color);
    font-weight: 600;
    padding: 0 1%;
    border-radius: 20px;
    height: 50%;
}
h1{
    margin-left: 2rem;
}
.main::-webkit-scrollbar-track {
  /* border: 1px solid #000; */
  padding: 2px 0;
  border-radius: 8px;
}

.main::-webkit-scrollbar {
  width: 15px;
}

.main::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: white;
  border: 1px solid #000;
}



</style>