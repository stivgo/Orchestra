<template>
    <div>
        <select v-model="locale" @change="switchLocale()">
          <option v-for="locale in locales" :key="locale" :value="locale">
            {{locale}}
          </option>
        </select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'; 
export default Vue.extend({
  name: 'LocaleSwitcher',
  data() {
    return {
      locales: ['en','es'] as Array<string>,
      locale: 'en' as string
    }
  },
  methods:{
    switchLocale() {
      if (this.$i18n.locale !== this.locale) {
          this.$i18n.locale = this.locale;
      }
    }
  }
})
</script>

<style>

</style>