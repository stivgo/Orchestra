<template>
  <article>
    {{project.name}}
  </article>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Project',
  props: ["project"]
  
});
</script>

<style scoped>
article{
    width: 200px;
    height: 200px;
    border: solid black 1px;
    margin-right: 3%;
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

</style>

