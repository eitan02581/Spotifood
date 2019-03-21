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

function query(){
    return users
}

module.exports = {
    query,
    getById
}