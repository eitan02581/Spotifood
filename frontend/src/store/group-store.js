import Vue from 'vue'
import Vuex from 'vuex'

import groupService from '../services/GroupServices.js'
Vue.use(Vuex)

const groupStore = {
    state: {
        groups: [],
        group: null

    }, getters: {
        groups(state) {
            return state.groups
        },
        group(state) {
            return state.group
        }
    },
    mutations: {
        setGroups(state, { groups }) {

            state.groups = groups
        },
        setGroup(state, { group }) {
            state.group = group
        },
    },
    actions: {
        getGroups({ commit }) {
            groupService.query().then(groups => commit({ type: 'setGroups', groups }))
        },
        filterGroups({ commit }, { filterBy }) {
            groupService.query(filterBy).then((groups) => commit({ type: 'setGroups', groups }))
        },
        // getGroup({ commit }, { groupId }) {
        //     return groupService.getById(groupId).then((group) => {
        //         commit({ type: 'setGroup', group })
        //     })
        // },    }

        getGroupById({ commit, state }, payload) {
            state.group = null
            setTimeout(()=>{
                groupService.getById(payload._id)
                    .then(group => commit({ type: 'setGroup', group }))
            },1500)
        }
    }
}

export default groupStore
