import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/store'
import './mock/axios'

Vue.config.productionTip = false

const app = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')

Object.defineProperty(window, '$app', {
  get() {
    return app
  },
})
