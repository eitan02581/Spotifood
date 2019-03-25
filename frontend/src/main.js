import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import './assets/style.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/store'
import './filters.js'
import * as VueGoogleMaps from 'vue2-google-maps'
import AOS from '../node_modules/aos'
import '../node_modules/aos/dist/aos.css'
import 'vue-event-calendar/dist/style.css' //^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
import FunctionalCalendar from 'vue-functional-calendar';
import Vuetify from 'vuetify'
import VuetifyToast from 'vuetify-toast-snackbar'
// require('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons')
require('vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)
Vue.use(FunctionalCalendar)
Vue.use(vueEventCalendar, { locale: 'en' })


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCEIrbCmODXToFDp94rRIqMtWFq1V9X6fE',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})

Vue.config.productionTip = false

Vue.use(Element, { locale: 'en' })

Vue.use(VuetifyToast, {
  x: 'center', // default
  y: 'bottom', // default
  color: '#292929', // default
  icon: 'WEat',
  timeout: 3000, // default
  dismissable: true, // default
  autoHeight: false, // default
  multiLine: false, // default
  vertical: false, // default
  shorts: {
    Success: {
      color: 'green'
    },
    Error: {
      color: 'red'
    }
  },
  property: '$toast' // default
})



new Vue({
  created() {
    AOS.init()
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
