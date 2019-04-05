const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const GROUP_COLLECTION = 'groups'
const userService = require('./user-service.js')
var UtilService = require('./util-service.js');
var groups = require('../data/groups.json')

function _resetDb() {
    _cleanCollection()
    _addMany()
}

function _addMany() {
    return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION).insertOne(groups))
        .then(res => {
            group._id = res.insertedId
            return group
        })
}

function _cleanCollection() {
    return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION).remove({}))
        .then(res => {
            console.log('result after clearing', res)
        })
}

async function query(filterBy) {

    var queryToMongo = {}
    if (filterBy.hashtags) {
        filterBy.hashtags = filterBy.hashtags.split(',')
        var hashtags = filterBy.hashtags.map(el => { return { hashtags: new RegExp(el, 'i') } })
        queryToMongo['$or'] = hashtags
    }
    if (filterBy.cuisineType) queryToMongo.cuisineType = filterBy.cuisineType
    if (filterBy.eventType) queryToMongo.eventType = filterBy.eventType
    if (filterBy.guests) queryToMongo.guests = +filterBy.guests
    if (filterBy.title) queryToMongo.title = new RegExp(filterBy.title, 'i');
    if (filterBy.country) queryToMongo['place.country.longName'] = new RegExp(filterBy.country, 'i');

    var db = await mongoService.connect()
    var groups = await db.collection(GROUP_COLLECTION).aggregate(
        [
            {
                $match: queryToMongo
            },
            {
                $lookup: {
                    from: "users",
                    localField: "admin",
                    foreignField: "_id",
                    as: "admin"
                }
            }
        ]).toArray()
    return groups.map(group => {
        group.admin = group.admin[0]
        return group
    })
}

function getById(groupId) {
    const _id = new ObjectId(groupId)
    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION).aggregate(
                [
                    {
                        $match: { _id }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "users",
                            foreignField: "_id",
                            as: "users"
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "pendingUsers",
                            foreignField: "_id",
                            as: "pendingUsers"
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "admin",
                            foreignField: "_id",
                            as: "admin"
                        }
                    },
                    {
                        $lookup: {
                            from: "recipes",
                            localField: "recipes",
                            foreignField: "_id",
                            as: "recipes"
                        }
                    },
                ]
            ).toArray()
        })
        .then(group => {
            group[0].admin = group[0].admin[0]
            return group[0]
        })
}

function update(group) {
    group._id = new ObjectId(group._id)
    return getCollection()
        .updateOne({ _id: group._id }, { $set: group })
}

function getCollection() {
    return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION))

}

async function add(group) {
    group.users = []
    group.recipes = []
    group.pendingUsers = []
    group.admin = new ObjectId(group.admin)
    var db = await mongoService.connect()
    db.collection(GROUP_COLLECTION).insertOne(group)
    await userService.addGroupToCreatedGroups(group.admin, group._id, db)
    return group

}

function remove(groupId) {
    return mongoService.connect()
        .then(db => {
            db.collection(GROUP_COLLECTION).remove({ _id: ObjectId(groupId) })
        })
}

// ask join group
// TODO: CHECK IF USERSID EXISTS IN PRENDINGUSERS AND ONLY IF NOT PUSH USERID
function askJoin(ids) {
    const group_id = new ObjectId(ids.groupId)
    const user_id = new ObjectId(ids.userId)

    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION)
                .updateOne({ _id: group_id }, { $push: { pendingUsers: user_id } })
        })
}

// user leave group || admin remove user
async function removeUserFromGroup(ids) {
    const group_id = new ObjectId(ids.groupId)
    const user_id = new ObjectId(ids.userId)
    console.log('user11 ', group_id);

    var db = await mongoService.connect()
    userService.removeGroupFromUser(db, user_id, ids.groupId)
    removePendingUser(ids)
    return db.collection(GROUP_COLLECTION).updateOne({ _id: group_id }, { $pull: { users: user_id } })
    // TODO: consider remove pending user 
}

// add participant to group
async function addParticipant(ids) {
    const user_id = new ObjectId(ids.userId)
    const group_id = new ObjectId(ids.groupId)
    var db = await mongoService.connect()

    db.collection(GROUP_COLLECTION)
        .updateOne({ _id: group_id }, { $push: { users: user_id } })

    db.collection(GROUP_COLLECTION)
        .updateOne({ _id: group_id }, { $pull: { pendingUsers: user_id } })

    return await userService.addGroupToUser(db, user_id, group_id)

}

async function removePendingUser(ids) {
    const user_id = new ObjectId(ids.userId)
    const group_id = new ObjectId(ids.groupId)
    var db = await mongoService.connect()
    return db.collection(GROUP_COLLECTION).updateOne({ _id: group_id }, { $pull: { pendingUsers: user_id } })
}

async function addRecipeToGroup(recipeId, groupId, db) {
    const _id = new ObjectId(groupId)
    return db.collection(GROUP_COLLECTION).updateOne(
        { _id },
        { $push: { recipes: recipeId } }
    )
}

function removeRecipeFromGroup(recipeId, groupId) {
    const _id = new ObjectId(groupId)
    const recipe = new ObjectId(recipeId)
    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION).updateOne(
                { _id },
                { $pull: { recipes: recipe } }
            )
        })
}

module.exports = {
    query,
    getById,
    update,
    add,
    remove,
    askJoin,
    addParticipant,
    removePendingUser,
    addRecipeToGroup,
    removeRecipeFromGroup,
    removeUserFromGroup
}
