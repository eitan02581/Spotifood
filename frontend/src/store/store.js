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
    ],
    categoriesBcgImgs:[
      'http://res.cloudinary.com/sprint4-weat/image/upload/v1554011038/demo/gz0dkci17jvcs37ddqtc.jpg',
      'http://res.cloudinary.com/sprint4-weat/image/upload/v1554011658/demo/biid0rdklvvnu5aomy9k.jpg',
      'http://res.cloudinary.com/sprint4-weat/image/upload/v1553969942/demo/ttcwgee8pipw1a8xhfgb.jpg',
      'http://res.cloudinary.com/sprint4-weat/image/upload/v1554016036/demo/eby7lv2iq5htakmfovs1.jpg',
      'http://res.cloudinary.com/sprint4-weat/image/upload/v1554012239/demo/yyrfe7xwtmwfurt8zcfl.jpg',
      'http://res.cloudinary.com/sprint4-weat/image/upload/v1554012183/demo/rebxkmqfdymgr5kves8d.jpg',
      'http://res.cloudinary.com/sprint4-weat/image/upload/v1554012116/demo/mhprjm4vo77wrwgikj1n.jpg',
      'http://res.cloudinary.com/sprint4-weat/image/upload/v1553977869/demo/rionq4vgyoy0u7qwv6ov.jpg',
      'http://res.cloudinary.com/sprint4-weat/image/upload/v1554011735/demo/ij8gw9ktqkqcuxnclah4.jpg'
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
    },
    categoriesBcgImgs(state){
      return state.categoriesBcgImgs
    }
  },
  actions: {
  },
  modules: {
    groupStore,
    userStore
  },
})
