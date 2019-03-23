const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const USER_COLLECTION = 'users'
var users = require('../data/users.json')

// _addMany()

function _addMany() {
    return mongoService.connect()
        .then(db => db.collection(USER_COLLECTION).insert(users))
        .then(res => {
            user._id = res.insertedId
            return user
        })
}


function getById(userId) {
    const _id = new ObjectId(userId)
    return mongoService.connect()
        .then(db => db.collection(USER_COLLECTION).findOne({ _id }))
}

function query() {
    return users
}

function login(userInfo) {
    var user = {
        $and: [{ username: userInfo.username }, { password: userInfo.password }]
    }
    return mongoService.connect()
        .then(db => db.collection('users').findOne(user)).then(user => {
            if (!user) throw ('wrong Cradentials')
            else return user
        })
    // .catch()
    // TODO: RETURN ERR IF NOT MATCHED
}

// TODO: CHECK IF NICKNAME OR EMAIL IS NOT TAKEN 
function addUser(newUser) {
    var user = newUser
    return mongoService.connect()
        .then(db => db.collection('users').insertOne(user))
        .then(res => {
            user._id = res.insertedId
            return user
        })
}


module.exports = {
    query,
    getById,
    login,
    addUser
}