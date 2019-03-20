import Vue from 'vue'
import Vuex from 'vuex'


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
