import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/homePage'
import Group from '@/views/groups'
import About from '@/views/about'
import Login from '@/components/log-in-cmp'
import Signup from '@/components/sign-up-cmp'
import GroupEdit from './views/group-edit.vue'


Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: HomePage },
    { path: '/groups', component: Group },
    { path: '/group/edit/:id?', component: GroupEdit },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
  ]
})
