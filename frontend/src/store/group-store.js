import Vue from 'vue'
import Vuex from 'vuex'

import groupService from '../services/GroupServices.js'
Vue.use(Vuex)

const groupStore = {
    state: {
        groups: [
            {
                _id: "pio40jv",
                title: "Peruvian Food With Gordon Ramsay",
                img: "https://api.adorable.io/avatars/300/sprint1",
                users: [
                    {
                        username: "yovelb",
                        img: "https://api.adorable.io/avatars/300/yovelb",
                        groups: [],
                        password: "123",
                        favCategories: [],
                        isAdmin: false
                    },
                    {
                        username: "Eitan",
                        img: "https://api.adorable.io/avatars/300/Eitan",
                        groups: [],
                        password: "123",
                        favCategories: [],
                        isAdmin: false
                    },
                    {
                        username: "Alex",
                        img: "https://api.adorable.io/avatars/300/Alex",
                        groups: [],
                        password: "123",
                        favCategories: [],
                        isAdmin: false
                    }
                ],
                recipes: [
                    {
                        title: "england recipe",
                        ingrediens: [
                            {
                                poteto: 1
                            },
                            {
                                tomato: 0.5
                            },
                            {
                                eggs: 5
                            }
                        ],
                        instructions: [
                            "buy eggs",
                            "put in microwave",
                            "go sleep"
                        ],
                        imgs: [''],
                        categories: [''],
                        prepTime: 1555190094008,
                        rating: 1,
                        createdBy: '',
                        createdAt: 1555190094008
                    },
                    {
                        title: "israeli recipe",
                        ingrediens: [
                            {
                                poteto: 1
                            },
                            {
                                tomato: 0.5
                            },
                            {
                                eggs: 5
                            }
                        ],
                        instructions: [
                            "buy eggs",
                            "put in microwave",
                            "go sleep"
                        ],
                        imgs: [''],
                        categories: [''],
                        prepTime: 1555190094008,
                        rating: 1,
                        createdBy: '',
                        createdAt: 1555190094008
                    },
                    {
                        title: "peruvian recipe",
                        ingrediens: [
                            {
                                poteto: 1
                            },
                            {
                                tomato: 0.5
                            },
                            {
                                eggs: 5
                            }
                        ],
                        instructions: [
                            "buy eggs",
                            "put in microwave",
                            "go sleep"
                        ],
                        imgs: [''],
                        categories: [''],
                        prepTime: 1555190094008,
                        rating: 1,
                        createdBy: '',
                        createdAt: 1555190094008
                    }
                ],
                time: 1555190094008,
                location: {
                    lat: 32.088002, lng: 34.803081
                },
                place: "Coding Academy , Ramat Gan",
                hashtags: [
                    "Nervous",
                    "Class",
                    "Beef",
                    "Pasta"
                ]
            }],
        group: {
            _id: "pio40jv",
            title: "Peruvian Food With Gordon Ramsay",
            img: "https://api.adorable.io/avatars/300/sprint1",
            users: [
                {
                    username: "yovelb",
                    img: "https://api.adorable.io/avatars/300/yovelb",
                    groups: [],
                    password: "123",
                    favCategories: [],
                    isAdmin: false
                },
                {
                    username: "Eitan",
                    img: "https://api.adorable.io/avatars/300/Eitan",
                    groups: [],
                    password: "123",
                    favCategories: [],
                    isAdmin: false
                },
                {
                    username: "Alex",
                    img: "https://api.adorable.io/avatars/300/Alex",
                    groups: [],
                    password: "123",
                    favCategories: [],
                    isAdmin: false
                }
            ],
            recipes: [
                {
                    title: "england recipe",
                    ingrediens: [
                        {
                            poteto: 1
                        },
                        {
                            tomato: 0.5
                        },
                        {
                            eggs: 5
                        }
                    ],
                    instructions: [
                        "buy eggs",
                        "put in microwave",
                        "go sleep"
                    ],
                    imgs: [''],
                    categories: [''],
                    prepTime: 1555190094008,
                    rating: 1,
                    createdBy: '',
                    createdAt: 1555190094008
                },
                {
                    title: "israeli recipe",
                    ingrediens: [
                        {
                            poteto: 1
                        },
                        {
                            tomato: 0.5
                        },
                        {
                            eggs: 5
                        }
                    ],
                    instructions: [
                        "buy eggs",
                        "put in microwave",
                        "go sleep"
                    ],
                    imgs: [''],
                    categories: [''],
                    prepTime: 1555190094008,
                    rating: 1,
                    createdBy: '',
                    createdAt: 1555190094008
                },
                {
                    title: "peruvian recipe",
                    ingrediens: [
                        {
                            poteto: 1
                        },
                        {
                            tomato: 0.5
                        },
                        {
                            eggs: 5
                        }
                    ],
                    instructions: [
                        "buy eggs",
                        "put in microwave",
                        "go sleep"
                    ],
                    imgs: [''],
                    categories: [''],
                    prepTime: 1555190094008,
                    rating: 1,
                    createdBy: '',
                    createdAt: 1555190094008
                }
            ],
            time: 1555190094008,
            location: {
                lat: 32.088002, lng: 34.803081
            },
            place: "Coding Academy , Ramat Gan",
            hashtags: [
                "Nervous",
                "Class",
                "Beef",
                "Pasta"
            ]
        },

    }, getters: {
        groups(state) {
            return state.group
        },
    },
    mutations: {
        setGroups(state, { groups }) {
            state.groups = groups
        },
    },
    actions: {
        getGroups({ commit }) {
            groupService.query()
                .then(groups => commit({ type: 'setGroups', groups }))
        },
        getGroupById(context, payload) {
            groupService.getById(payload._id)
            // .then(group => grup)
        }
    }
}

export default groupStore
