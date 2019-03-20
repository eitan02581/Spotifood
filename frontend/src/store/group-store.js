import Vue from 'vue'
import Vuex from 'vuex'

import groupService from '../services/GroupServices.js'
Vue.use(Vuex)

const groupStore = {
    state: {
        groups: [],
        group: null,

    }, getters: {
        groups(state) {
            return state.groups
        }
    },
    mutations: {
        setGroups(state, { groups }) {
            state.groups = groups
        }
    },
    actions: {
        getGroups({ commit }) {
            groupService.query().then(groups => commit({ type: 'setGroups', groups }))
        }
    }
}

export default groupStore