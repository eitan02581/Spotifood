import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/homePage'
import Recipes from '@/views/recipes'
import Group from '@/views/group'
import About from '@/views/about'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {path:'/', component: HomePage},
    {path:'/recipe', component: Recipes},
    {path:'/group', component: Group},
    {path:'/about', component: About},
  ]
})
