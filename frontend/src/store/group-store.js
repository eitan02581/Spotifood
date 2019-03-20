import Vue from 'vue'
import Vuex from 'vuex'

<<<<<<< HEAD
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
 
  }
})
=======

Vue.use(Vuex)

const groupStore = {
    state: {
        groupes: [],
        group: null,

    }, getters: {
    },
    mutations: {

    },
    actions: {
        getGroups({ commit }) {

        }
    }
}

export default groupStore
>>>>>>> 8eac5727ddcfb25ed0570e7afdef52b357bbac1c
