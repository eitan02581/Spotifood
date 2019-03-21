import axios from 'axios'
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

}

export default {
    query,
    getById,
    add,
    remove,
    update
}