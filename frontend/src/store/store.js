import Vue from 'vue'
import Vuex from 'vuex'

import groupStore from './group-store.js'
import userStore from './user-store.js'

import uploadService from '../services/UploadService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      "Israeli",
      "French",
      "Italian",
      "British",
      "Vietnamese",
      "Chinese",
      "Indian",
      "American",
      "Vegan",
      "Other"
    ]
  },
  mutations: {

  },
  getters: {
    categories(state) {
      return state.categories
    }
  },
  actions: {
    uploadImg({commit},{img}){
      return uploadService.uploadImg(img).then(res => res)
    }
  },
  modules: {
    groupStore,
    userStore
  },
})
