import Vue from 'vue'
import Vuex from 'vuex'

import groupStore from './group-store.js'
import userStore from './user-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: ['food', 'Yami!', 'Meat']
  },
  mutations: {

  },
  getters: {
    categories(state) {
      return state.categories
    }
  },
  actions: {
  },
  modules: {
    groupStore,
    userStore
  },
})
