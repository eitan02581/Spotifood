const mongoService = require('./mongo-service')
const userService = require('./user-service')
const ObjectId = require('mongodb').ObjectId;
const GROUP_COLLECTION = 'groups'

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

function query(filterBy) {



    if (filterBy) {
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

        console.log(queryToMongo);
        return mongoService.connect()
            .then(db => db.collection(GROUP_COLLECTION).find(queryToMongo).toArray())
            .then(groups => {
                return groups
            })
    }
    else return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION).find({}).toArray())
}

function getById(groupId) {
    const _id = new ObjectId(groupId)
    return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION).findOne({ _id }))
        .then(group => {
            // console.log('group selected is', group)
            return group
        })
}

function update(group) {
    // console.log('group to update is', group)
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
    var group = {}
    group._id = new ObjectId(ids.groupId)

    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION)
                .updateOne({ _id: group._id }, { $push: { pendingUsers: ids.userId } })
        })
}

// user leave group || admin remove user
function removeUserFromGroup(ids) {
    var group = {}
    group._id = new ObjectId(ids.groupId)
    // console.log('asd', group._id);

    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION)
                .updateOne({ _id: group._id }, { $pull: { users: ids.userId } })
        }).then(() => {
            removePendingUser(ids)
        })
}

// add participant to group
function addParticipant(ids) {
    var group = {}
    group._id = new ObjectId(ids.groupId)

    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION)
                .updateOne({ _id: group._id }, { $push: { users: ids.userId } })

        }).then(removePendingUser(ids))
}

function removePendingUser(ids) {
    var group = {}
    group._id = new ObjectId(ids.groupId)

    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION)
                .updateOne({ _id: group._id }, { $pull: { pendingUsers: ids.userId } })
        })
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
