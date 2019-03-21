// import UtilService from './UtilService.js'
import axios from 'axios'

var users = null
const USER_ROUTE = (process.env.NODE_ENV !== 'development') ? '/user' : 'http://localhost:3001/user'

function getUsers() {

}

function _createUsers() {
}

function getUserById(userId){
    return axios.get(`${USER_ROUTE}/${userId}`).then(user => user.data)
}

export default {
    getUserById
} 