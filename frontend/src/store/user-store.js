import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const userStore = {
    state: {

    },
    mutations: {

    },
    actions: {
        getUserById(context,payload) {
            groupService.query()
                .then(groups => commit({ type: 'setGroups', groups }))
        },
    }
}

export default userStore