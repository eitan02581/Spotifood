import axios from 'axios'
import userService from './UserService'
import recipesService from './RecipeService'
// TODO: UPDATE TO THE ACTUAL PROJ NAME
const GROUP_ROUTE = (process.env.NODE_ENV !== 'development') ? '/group' : 'http://localhost:3003/group'

function query(filterBy) {
    if (filterBy) {

        let filterQuery = '?';
        if (filterBy.searcInput) filterQuery += `general=${filterBy.searcInput}&`
        // if (filterBy.type !== 'All' && filterObj.type) filterQuery += `type=${filterObj.type}&`
        // if (filterBy.inStock !== 'All' && filterObj.inStock) filterQuery += `inStock=${filterObj.inStock}&`
        // filterQuery += `sortBy=${filterObj.sortBy}`
        // console.log(filterQuery);

        return axios.get(`${GROUP_ROUTE}/${filterQuery}`).then(filterdGroups => filterdGroups.data)
        // axios.get(`${GROUP_ROUTE}/${filterQuery}`).then(groups => groups.data)
    }
    else return axios.get(`${GROUP_ROUTE}`).then(groups => groups.data)
}

function add(group) {
}

function update(group) {
}

function remove(groupId) {
}

function getById(groupId) {
    return axios.get(`${GROUP_ROUTE}/${groupId}`)
        .then(groupPrm => {
            var groupUsers = []
            groupPrm.data.users.forEach(userId => {
                return userService.getUserById(userId)
                    .then(user => {
                        groupUsers.push(user)
                    })
            })
            var groupRecipes = []
            groupPrm.data.recipes.forEach(recipeId => {
                return recipesService.getRecipeById(recipeId)
                    .then(recipe => {
                        console.log('recipe',recipe)
                        groupRecipes.push(recipe)
                    })
            })
            groupPrm.data.users = groupUsers
            groupPrm.data.recipes = groupRecipes
            return groupPrm.data
        })
}

export default {
    query,
    getById,
    add,
    remove,
    update
}