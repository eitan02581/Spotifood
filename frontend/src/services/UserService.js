
import axios from 'axios'
import storageService from './StorageService.js'
import SocketService from './SocketService.js';
// import 
var users = null
const USER_ROUTE = (process.env.NODE_ENV !== 'development') ? '/user' : 'http://localhost:3007/user'

const CURR_USER = 'currUser'

function getUsers() {

}

function _createUsers() {
}

function updateUser(user) {
    return axios.post(`${USER_ROUTE}/${user._id}`, user)
        .then(user => user.data)
}

function getUserById(userId) {
    return axios.get(`${USER_ROUTE}/${userId}`)
        .then(user => user.data)
}

function logIn(user) {
    return axios.post(`${USER_ROUTE}/login`, user)
        .then(user => {
            user = user.data
            storageService.store(CURR_USER, user)
            return user
        })
        .catch(() => { throw ('wrong user or pass') })
}
function signUp(newUser) {

    newUser.groups = []
    newUser.isAdmin = false
    newUser.img = 'http://res.cloudinary.com/sprint4-weat/image/upload/v1553679542/demo/hueavks6ncdlxxp22fnn.jpg'

    return axios.post(`${USER_ROUTE}/signup`, newUser)
        .then(user => {
            user = user.data
            storageService.store(CURR_USER, user)
            return user
        })
        .catch(() => 'could not sign up')
}

function checkIfLogged() {
    var loggedUser = storageService.load(CURR_USER)
    if (loggedUser) {
        SocketService.connect(loggedUser._id)
        return loggedUser
    }
    return Promise.reject()
}

function logOut() {
    storageService.remove(CURR_USER)
}
function addGroupToUser(ids) {
    return axios.put(`${USER_ROUTE}/addGroup/${ids.userId}`, ids)
}
export default {
    getUserById,
    logIn,
    signUp,
    checkIfLogged, logOut,
    addGroupToUser,
    updateUser
} 