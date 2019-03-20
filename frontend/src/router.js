import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/homePage'
import Group from '@/views/groups'
import About from '@/views/about'
import Login from '@/components/log-in-cmp'
import Signup from '@/components/sign-up-cmp'
import GroupDetails from '@/views/group-details'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: HomePage },
    { path: '/groups/:groupId', component: GroupDetails },
    { path: '/groups', component: Group },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
  ]
})
