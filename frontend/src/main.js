import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import './assets/style.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/store'
import './filters.js'
import AOS from '../node_modules/aos'
import '../node_modules/aos/dist/aos.css'

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
  created() {
    AOS.init()
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
