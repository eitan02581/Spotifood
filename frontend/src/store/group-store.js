import Vue from 'vue'
import Vuex from 'vuex'

import groupService from '../services/GroupService.js'
Vue.use(Vuex)

const groupStore = {
    state: {
        groups: [],
        group: null,
        pendUsers: []

    }, getters: {
        groups(state) {
            return state.groups
        },
        group(state) {
            return state.group
        },
        pendUsers(state) {
            return state.pendUsers
        }
    },
    mutations: {
        setGroups(state, { groups }) {

            state.groups = groups
        },
        setGroup(state, { group }) {
            state.group = group
        },
        setPendUsers(state, { pendUsers }) {
            state.pendUsers = pendUsers
        }
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
            setTimeout(() => {
                groupService.getById(payload._id)
                    .then(group => {
                        commit({ type: 'setGroup', group })
                        commit({ type: 'setPendUsers', pendUsers: group.pendingUsers })
                    })
            }, 1500)
        },
        addGroup({ commit, state }, { group }) {
            return groupService.add(group)
                .then(newGroup => {
                    console.log('newly added group is', newGroup)
                    commit({ type: 'setGroup', newGroup })
                    return newGroup
                })
        },
        askJoinGroup({ commit }, { ids }) {

            groupService.askJoinGroup(ids).then((group) => {
                console.log(group);

            })
        },
        acceptUserToGroup({ commit }, { ids }) {
            return groupService.addUserToGroup(ids).then((res) => res)
        },
        declineUserRequest({ commit }, { ids }) {
            return groupService.declineUserRequest(ids).then((res) => res)
        }
    }
}

export default groupStore
