import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/homePage'
import Groups from '@/views/groups'
import About from '@/views/about'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: HomePage },
    { path: '/groups', component: Groups },
    { path: '/about', component: About },
  ]
})
