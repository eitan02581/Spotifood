import Vue from 'vue'
import Vuex from 'vuex'

import groupService from '../services/GroupService.js'
import RecipeService from '../services/RecipeService.js';
import socketService from '../services/SocketService.js';

Vue.use(Vuex)

const groupStore = {
    state: {
        groups: [],
        group: null,
        pendUsers: [],
        homePageFitler: null,
        isGroupAdmin: false,


    }, getters: {
        groups(state) {
            return state.groups
        },
        group(state) {
            return state.group
        },
        pendUsers(state) {
            return state.group.pendingUsers
        },
        groupAdmin(state) {
            return state.groupAdmin
        },
        isGroupAdmin(state) {
            return state.isGroupAdmin
        },
        getHomePageFitler(state) {
            return state.homePageFitler
        }
    },
    mutations: {
        cleanGroup(state) {
            state.group = null
            state.isGroupAdmin = false
            state.homePageFitler = null
        },
        setGroups(state, { groups }) {
            state.groups = groups
        },
        setGroup(state, { group }) {
            state.group = group
        },
<<<<<<< HEAD
        removeUserFromGroup(state, { userId }) {
            state.group.users = state.group.users.filter(user => user._id !== userId)
=======
        // socket
        addPendUser(state, { pendUserId }) {
            console.log('pend socket!', state.pendUsers);
            state.pendUsers.push(pendUserId)
            console.log('pend socket!', state.pendUsers);


        }
        ,
        setPendUsers(state, { pendUsers }) {
            state.pendUsers = pendUsers
        },
        // for reactive adding
        addUserToGroup(state, { user }) {
            state.group.users.push(user)
        },
        removeUserFromGroup(state, { userId }) {
            console.log(userId);
            state.group.users = state.group.users.filter(user => user._id !== userId)
            console.log(state.group.users);

>>>>>>> cdb5789cb5add8e579190297839979fb41448708
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
        },
        setFilterFromHome(state, { filterObj }) {
            state.homePageFitler = filterObj
        },
        clearFilter(state) {
            state.homePageFitler = null
        },
        addUserToGroup(state, { user }) {
            state.group.users.push(user)
        },
        removeUserFromPend(state, { userId }) {
            let idx = state.group.pendingUsers.findIndex(user => user._id === userId)
            state.group.pendingUsers.splice(idx, 1)
        }
    },
    actions: {
        cleanData({ commit }) {
            commit({ type: 'cleanGroup' })
        },
        getGroups({ commit }) {
            return groupService.query().then(groups => commit({ type: 'setGroups', groups }))
        },
        setFilterFromHome({ commit }, { filterObj }) {
            commit({ type: 'setFilterFromHome', filterObj })
        },
        filterGroups({ commit }, { filterBy }) {
            groupService.query(filterBy)
                .then((groups) => { commit({ type: 'setGroups', groups }) })
        },
        getGroupById({ commit, state }, { groupId }) {
            commit({ type: 'cleanGroup' })
            return groupService.getById(groupId)
                .then(group => {
                    commit({ type: 'setGroup', group })
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
        askJoinGroup(context, { ids }) {
            return groupService.askJoinGroup(ids).then(() => {
                var user = context.getters.user
                var group = context.getters.group
                socketService.emit('joinGroup', { user, group })
                return 'asked successfuly'
            })
        },
        removeUserFromGroup({ commit }, { ids }) {
            return groupService.removeUserFromGroup(ids).then(() => {
                // make it reactive
                console.log('broo');

                commit({ type: 'removeUserFromGroup', userId: ids.userId })
            })
        },
<<<<<<< HEAD
        acceptUserToGroup({ commit }, { ids }) {
            return groupService.addUserToGroup(ids).then(user => {
                commit({ type: 'addUserToGroup', user: user })
                commit({ type: 'removeUserFromPend', userId: ids.userId })
=======
        acceptUserToGroup({ commit }, { ids, user }) {
            return groupService.addUserToGroup(ids).then((res) => {
                console.log('after adding ', user);

                commit({ type: 'addUserToGroup', user })
>>>>>>> cdb5789cb5add8e579190297839979fb41448708
            })

        },
        declineUserRequest({ commit }, { ids }) {
            return groupService.declineUserRequest(ids).then(() => {
                commit({ type: 'removeUserFromPend', userId: ids.userId })
            })
        },

    }
}

export default groupStore
