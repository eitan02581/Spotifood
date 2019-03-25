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


async function getById(userId) {
    // if (userId) return {}
    const _id = new ObjectId(userId)
    var db = await mongoService.connect()
    var user = db.collection(USER_COLLECTION).findOne({ _id })
    delete user.password
    return user
}

function query() {
    return users
}

function login(userInfo) {
    var user = {
        $and: [{ username: userInfo.username }, { password: userInfo.password }]
    }
    return mongoService.connect()
        .then(db => db.collection(USER_COLLECTION).findOne(user)).then(user => {
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
        .then(db => db.collection(USER_COLLECTION).insertOne(user))
        .then(res => {
            user._id = res.insertedId
            return user
        })
}

function addGroupToUser(ids) {
    var user = {}
    user._id = new ObjectId(ids.userId)
    return mongoService.connect()
        .then(db => {
            return db.collection(USER_COLLECTION)
                .updateOne({ _id: user._id }, { $push: { groups: ids.groupId } })
        })
}




module.exports = {
    query,
    getById,
    login,
    addUser,
    addGroupToUser,
}