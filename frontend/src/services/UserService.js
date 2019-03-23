// import UtilService from './UtilService.js'
import axios from 'axios'
import storageService from './StorageService.js'
var users = null
const USER_ROUTE = (process.env.NODE_ENV !== 'development') ? '/user' : 'http://localhost:3005/user'

const CURR_USER = 'currUser'

function getUsers() {

}

function _createUsers() {
}

function getUserById(userId) {
    return axios.get(`${USER_ROUTE}/${userId}`).then(user => user.data)
}
function logIn(user) {
    return axios.post(`${USER_ROUTE}/login`, user)
        .then(user => {
            user = user.data
            storageService.store(CURR_USER, user)
            return user
        })
        .catch(() => 'Wrong Username or Password')
}
function signUp(newUser) {

    newUser.groups = []
    newUser.favCategories = []
    newUser.isAdmin = false
    newUser.img = `https://api.adorable.io/avatars/300/${newUser.username}`

    return axios.post(`${USER_ROUTE}/signup`, newUser)
        .then(user => {
            user = user.data
            storageService.store(CURR_USER, user)
            return user
        })
        .catch(() => 'could not sign up')
}

function checkIfLogged() {
    return storageService.load(CURR_USER)
}

function logOut() {
    storageService.remove(CURR_USER)
}
export default {
    getUserById,
    logIn,
    signUp,
    checkIfLogged, logOut
} 