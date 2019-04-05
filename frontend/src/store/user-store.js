import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/UserService.js';
import uploadService from '../services/UploadService.js'
import socketService from '../services/SocketService.js'

Vue.use(Vuex)

const userStore = {
    state: {
        user: null,
        currSocket: null,
    },
    getters: {
        user: (state) => state.user,
        currSocket: (state) => state.currSocket,
    },
    mutations: {
        setUser(state, { user }) {
            console.log('setting user')
            state.user = user
            state.currSocket = socketService.connect(user._id)
        },
        cleanUser(state) {
            state.user = null
            // state.is
        },
        initCurrSocket(state, { user }) {
            if (user) {
                let { _id } = user;
                state.currSocket = socketService.connect(_id);
                state.currSocket.on('userJoined', user=> {
                    console.log('user id', user)
                    this.commit({ type: 'addPendUser', userId: user._id })
                })
            }
        }
    },
    actions: {
        checkIfLogged({ commit, state }) {
            var user = userService.checkIfLogged()
            console.log('user is', user)
            if (!user) return Promise.reject()
            commit({ type: 'initCurrSocket', user })
            commit({ type: 'setUser', user })
            return user
        },
        logIn({ commit }, { user }) {
            return userService.logIn(user).then(user => {
                commit({ type: 'setUser', user })
                // TODO: RETURN A LOG FIX IT 
            }).catch((res) => { throw ('login err') })
        },
        signUp({ commit }, { newUser }) {
            return userService.signUp(newUser)
                .then(user => {
                    console.log(user);
                    commit({ type: 'setUser', user })
                    // TODO: RETURN A LOG FIX IT 
                }).catch((res) => console.log(res))
        },
        logOut({ state, dispatch, commit }) {
            commit({ type: 'cleanUser' })
            userService.logOut()
        },
        getUserById({ commit }, { userId }) {
            return userService.getUserById(userId)
                .then((user) => user)
        },
        addGroupToUser({ dispatch, commit }, { ids }) {
            console.log('hey man ', ids);
            return userService.addGroupToUser(ids).then(() => { 'group added' })
        },
        updateUser({ commit }, { user }) {
            return userService.updateUser(user).then(res => res)
        },
        uploadImg({ commit }, { userId, img }) {
            return uploadService.uploadUserImg(img, userId).then(res => res)
        }
    }
}

export default userStore