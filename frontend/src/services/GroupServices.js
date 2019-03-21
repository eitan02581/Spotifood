import axios from 'axios'
import userService from './UserService'
import recipesService from './RecipeService'
// TODO: UPDATE TO THE ACTUAL PROJ NAME
const GROUP_ROUTE = (process.env.NODE_ENV !== 'development') ? '/group' : 'http://localhost:3003/group'

function query(filterBy) {
    return axios.get(`${GROUP_ROUTE}`).then(groups => groups.data)
}

function add(group) {
}

function update(group) {
}

function remove(groupId) {
}

function getById(groupId) {
    return axios.get(`${GROUP_ROUTE}/${groupId}`)
        .then(res => res.data)
        .then(group => {
            var groupUsers = group.users.map(userId => {
                return userService.getUserById(userId)
            })
            var groupRecipes = group.recipes.map(recipeId => {
                return recipesService.getRecipeById(recipeId)
            })
            var promiseArray = [Promise.all(groupUsers),Promise.all(groupRecipes)]
            return Promise.all(promiseArray)
                .then(array => {
                    group.users = array[0]
                    group.recipes = array[1]
                    return group
                })
        })
}

export default {
    query,
    getById,
    add,
    remove,
    update
}