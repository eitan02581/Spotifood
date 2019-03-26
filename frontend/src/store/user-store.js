import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/UserService.js';


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
                // TODO: RETURN A LOG FIX IT 
            }).catch((res) => console.log(res))

        },
        signUp({ commit }, { newUser }) {
            return userService.signUp(newUser)
                .then(user => {
                    console.log(user);
                    commit({ type: 'setUser', user })
                    // TODO: RETURN A LOG FIX IT 
                }).catch((res) => console.log(res))
        },
        logOut({ commit }) {
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
        updateUser({ commit },{user}){
            return userService.updateUser(user).then(res => res)
        }
    }
}

export default userStore