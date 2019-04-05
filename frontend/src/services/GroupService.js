import axios from 'axios'
import userService from './UserService'
import recipesService from './RecipeService'
// TODO: UPDATE TO THE ACTUAL PROJ NAME
const GROUP_ROUTE = (process.env.NODE_ENV !== 'development') ? '/group' : 'http://localhost:3007/group'

function query(filterBy) {
    if (filterBy) {
        let filterQuery = '?';
        if (filterBy.hashtags.length >= 1) filterQuery += `hashtags=${filterBy.hashtags}&`
        if (filterBy.cuisineType) filterQuery += `cuisineType=${filterBy.cuisineType}&`
        if (filterBy.eventType) filterQuery += `eventType=${filterBy.eventType}&`
        if (filterBy.guests) filterQuery += `guests=${filterBy.guests}&`
        if (filterBy.title) filterQuery += `title=${filterBy.title}&`
        if (filterBy.country) filterQuery += `country=${filterBy.country}&`
        return axios.get(`${GROUP_ROUTE}/${filterQuery}`).then(filterdGroups => filterdGroups.data)
    }
    else return axios.get(`${GROUP_ROUTE}`).then(groups => groups.data)
}

function add(group) {
    return axios.post(`${GROUP_ROUTE}`, group)
        .then(res => {
            return res.data
        })
}

function update(group) {
}

function remove(groupId) {
}

function getById(groupId) {
    return axios.get(`${GROUP_ROUTE}/${groupId}`)
        .then(res => res.data)
}

function askJoinGroup(ids) {
    return axios.put(`${GROUP_ROUTE}/join/${ids.groupId}`, ids).then((res) => res.data)
}
function addUserToGroup(ids) {
    return axios.put(`${GROUP_ROUTE}/accept/${ids.groupId}`, ids).then((res) => res.data)


}
function declineUserRequest(ids) {
    console.log('try to decline');

    return axios.put(`${GROUP_ROUTE}/decline/${ids.groupId}`, ids).then((res) => res.data)
}

function removeRecipeFromGroup(recipeId, groupId) {
    return axios.delete(`${GROUP_ROUTE}/${groupId}/${recipeId}`).then(res => res)
}

function removeUserFromGroup(ids) {
    return axios.put(`${GROUP_ROUTE}/leave/${ids.groupId}`, ids).then((res) => res.data)

}

export default {
    query,
    getById,
    add,
    remove,
    update,
    askJoinGroup,
    addUserToGroup,
    declineUserRequest,
    removeRecipeFromGroup,
    removeUserFromGroup
}