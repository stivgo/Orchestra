import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'


require('@/store/subscriber')

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const token = localStorage.getItem('token')
const userId = localStorage.getItem('userId')
store.dispatch('session/attemptLoginSession', {token, userId}).then(() => {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
});
