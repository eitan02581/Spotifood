import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/UserService.js';


Vue.use(Vuex)

const userStore = {
    state: {
        user: {}
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        }
    },
    actions: {
        checkIfLogged({ commit }) {
            var user = userService.checkIfLogged()
            if (user) {
                console.log(user);
                commit({ type: 'setUser', user })
                return Promise.resolve(user)
            }
        },
        logIn({ commit }, { user }) {
            return userService.logIn(user).then(user => {
                commit({ type: 'setUser', user })
                // TODO: RETURN A LOG FIX IT 
            }).catch((res) => console.log(res))

        },
        signUp({ commit }, { newUser }) {
            return userService.signUp(newUser)
                .then(user => {
                    commit({ type: 'setUser', user })
                    // TODO: RETURN A LOG FIX IT 
                }).catch((res) => console.log(res))
        },
        logOut({ commit }) {
            userService.logOut()
        },
        getUserById({ commit }, { userId }) {
            return userService.getUserById(userId)
                .then(user => commit({ type: 'setUser', user }))
        },
    }
}

export default userStore