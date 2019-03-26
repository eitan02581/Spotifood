import Vue from 'vue'
import Vuex from 'vuex'

import groupService from '../services/GroupService.js'
import RecipeService from '../services/RecipeService.js';

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
        },
        groupAdmin(state) {
            return state.groupAdmin
        },
        isGroupAdmin(state) {
            return state.isGroupAdmin
        }
    },
    mutations: {
        cleanGroup(state) {
            state.group = null
        },
        setGroups(state, { groups }) {
            state.groups = groups
        },
        setGroup(state, { group }) {
            state.group = group
        },
        setPendUsers(state, { pendUsers }) {
            state.pendUsers = pendUsers
        },
        removeUserFromGroup(state, { userId }) {
            console.log(userId);

            state.group.users = state.group.users.filter(user => user !== userId)
        },
        removeRecipeFromGroup(state, { recipeId }) {
            let recipeIdx = state.group.recipes.findIndex(recipe => recipe._id === recipeId)
            state.group.recipes.splice(recipeIdx, 1)
        },
        setAdminObj(state, { admin }) {
            state.group.admin = admin
        },
        setIsGroupAdmin(state, { bool }) {
            state.isGroupAdmin = bool
        }
    },
    actions: {
        getGroups({ commit }) {
            groupService.query().then(groups => commit({ type: 'setGroups', groups }))
        },
        filterGroups({ commit }, { filterBy }) {
            groupService.query(filterBy)
                .then((groups) => { commit({ type: 'setGroups', groups }) })
        },
        // getGroup({ commit }, { groupId }) {
        //     return groupService.getById(groupId).then((group) => {
        //         commit({ type: 'setGroup', group })
        //     })
        // },    }
        getGroupById({ commit, state }, { groupId }) {
            commit({ type: 'cleanGroup' })
            return groupService.getById(groupId)
                .then(group => {
                    commit({ type: 'setGroup', group })
                    commit({ type: 'setPendUsers', pendUsers: group.pendingUsers })
                    return group
                })
        },

        removeRecipeFromGroup({ commit }, { recipeId, groupId }) {
            groupService.removeRecipeFromGroup(recipeId, groupId)
                .then(() => commit({ type: 'removeRecipeFromGroup', recipeId }))
        },
        addGroup({ commit, state }, { group }) {
            return groupService.add(group)
                .then(newGroup => {
                    commit({ type: 'setGroup', newGroup })
                    return newGroup
                })
        },
        askJoinGroup({ commit }, { ids }) {
            return groupService.askJoinGroup(ids).then(() => { 'asked successfuly' })
        },
        removeUserFromGroup({ commit }, { ids }) {
            return groupService.removeUserFromGroup(ids).then(() => {
                // make it reactive
                commit({ type: 'removeUserFromGroup', userId: ids.userId })
            })
        },
        acceptUserToGroup({ commit }, { ids }) {
            return groupService.addUserToGroup(ids).then((res) => res)

        },
        declineUserRequest({ commit }, { ids }) {
            return groupService.declineUserRequest(ids).then((res) => res)
        },

    }
}

export default groupStore
