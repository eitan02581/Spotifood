import Vue from 'vue'
import Vuex from 'vuex'

import groupStore from './group-store.js'
import userStore from './user-store.js'


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
      "Vegan"
    ],
    categoriesImgs:[
      "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604468/demo/vey7zynb2msqr5p4ntlh.png",
      "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604377/demo/iuqym1xcmag0qivg76qk.png",
      "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604440/demo/bwmszyygti1j44iaklxe.png",
      "http://res.cloudinary.com/sprint4-weat/image/upload/v1553532475/demo/eebgewy30zwm0nauyift.png",
      "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604700/demo/tpbcpaqyquiygqozek52.png",
      "http://res.cloudinary.com/sprint4-weat/image/upload/v1553532383/demo/vs51q9wpjurnjdr3jgtk.png",
      "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604410/demo/hh4m1bjiyt95wg1nrwj0.png",
      "http://res.cloudinary.com/sprint4-weat/image/upload/v1553532519/demo/huhedgc4ziopzei1fxed.png",
      "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604325/demo/yiqc4rpj6amsdb4sxfm1.png",
    ]
  },
  mutations: {

  },
  getters: {
    categories(state) {
      return state.categories
    },
    categoriesImgs(state) {
      return state.categoriesImgs
    }
  },
  actions: {
  },
  modules: {
    groupStore,
    userStore
  },
})
