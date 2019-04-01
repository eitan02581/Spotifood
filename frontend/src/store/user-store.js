import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/UserService.js';
import uploadService from '../services/UploadService.js'
import socketService from '../services/SocketService.js'



Vue.use(Vuex)

const userStore = {
    state: {
        user: null
    },
    getters: {
        user: (state) => state.user
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        },
        cleanUser(state) {
            state.user = null
            // state.is
        }
    },
    actions: {
        checkIfLogged({ commit }) {
            var user = userService.checkIfLogged()
            if (!user) return
            commit({ type: 'setUser', user })
            return Promise.resolve(user)
        },
        logIn({ commit }, { user }) {
            return userService.logIn(user).then(user => {
                commit({ type: 'setUser', user })
                socketService.connect(user._id)
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
            socketService.disconnect(state.user._id)
            commit({ type: 'cleanUser' })

            // dispatch({type:''})
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
            // console.log("userId",userId)
            return uploadService.uploadUserImg(img, userId).then(res => res)
        }
    }
}

export default userStore