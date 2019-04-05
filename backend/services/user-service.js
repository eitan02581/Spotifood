const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const USER_COLLECTION = 'users'
var users = require('../data/users.json')
const socket = require('../routes/socket-routes')

function _addMany() {
    return mongoService.connect()
        .then(db => db.collection(USER_COLLECTION).insert(users))
        .then(res => {
            user._id = res.insertedId
            return user
        })
}


async function getById(userId) {
    const _id = new ObjectId(userId)
    var db = await mongoService.connect()
    var user = await db.collection(USER_COLLECTION).aggregate(
        [
            {
                $match: { _id }
            },
            {
                $lookup: {
                    from: "groups",
                    localField: "groups",
                    foreignField: "_id",
                    as: "groups"
                }
            },
            {
                $lookup: {
                    from: "groups",
                    localField: "createdGroups",
                    foreignField: "_id",
                    as: "createdGroups"
                }
            },
        ]).toArray()
    delete user[0].password
    return user[0]
}

function query() {
    return users
}

async function login(userInfo) {
    var userDetails = {
        $and: [{ username: userInfo.username }, { password: userInfo.password }]
    }
    var db = await mongoService.connect()

    // var user = await db.collection(USER_COLLECTION).findOne(userDetails)
    var fullUser = await db.collection(USER_COLLECTION).aggregate(
        [
            {
                $match: userDetails
            },
            {
                $lookup: {
                    from: "groups",
                    localField: "groups",
                    foreignField: "_id",
                    as: "groups"
                }
            },
            {
                $lookup: {
                    from: "groups",
                    localField: "createdGroups",
                    foreignField: "_id",
                    as: "createdGroups"
                }
            },
        ]).toArray()
    delete fullUser[0].password
    return fullUser[0]
    // TODO: RETURN ERR IF NOT MATCHED
}

// TODO: CHECK IF NICKNAME OR EMAIL IS NOT TAKEN 
function addUser(newUser) {
    var user = newUser
    user.createdGroups = []
    return mongoService.connect()
        .then(db => db.collection(USER_COLLECTION).insertOne(user))
        .then(res => {
            user._id = res.insertedId
            return user
        })
}

async function addGroupToUser(db, userId, groupId) {
    db.collection(USER_COLLECTION)
        .updateOne({ _id: userId }, { $push: { groups: groupId } })

    var user = db.collection(USER_COLLECTION)
        .findOne({ _id: userId })

    delete user.password
    return user
}

async function removeGroupFromUser(db, userId, groupId) {
    return db.collection(USER_COLLECTION).updateOne({ _id: userId }, { $pull: { groups: groupId } })
}

async function addGroupToCreatedGroups(userId, groupId, db) {
    return db.collection(USER_COLLECTION)
        .updateOne({ _id: userId }, { $push: { createdGroups: groupId } })
}

async function updateUser(user) {
    user._id = new ObjectId(user._id)
    var db = await mongoService.connect()
    return db.collection(USER_COLLECTION)
        .updateOne({ _id: user._id }, { $set: user })
}

async function updateUserImg(userId, img) {
    const _id = new ObjectId(userId)
    var db = await mongoService.connect()
    return db.collection(USER_COLLECTION)
        .updateOne({ _id }, { $set: { img } })
}



module.exports = {
    query,
    getById,
    login,
    addUser,
    updateUser,
    updateUserImg,
    addGroupToUser,
    removeGroupFromUser,
    addGroupToCreatedGroups
}