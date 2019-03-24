const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const GROUP_COLLECTION = 'groups'

var UtilService = require('./util-service.js');
var groups = require('../data/groups.json')
// _resetDb()

function _resetDb() {
    _cleanCollection()
    _addMany()
}

function _addMany() {
    return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION).insert(groups))
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
        // TODO: CONTINIUE FROM HERE 
        if (filterBy.hashtags) {
            if (filterBy.hashtags.length >= 1) filterBy.hashtags = filterBy.hashtags.split(',')
            else filterBy.hashtags = [filterBy.hashtags]
            queryToMongo.hashtags = new RegExp(filterBy.hashtags, 'i');
            console.log(filterBy.hashtags);
            if (filterBy.hashtags.length >= 1)
                var hashtags = filterBy.hashtags.map(el => { return { hashtags: new RegExp(el, 'i') } })
        }
        if (filterBy.hashtags) {
            queryToMongo = {
                $and: [
                    { cuisineType: filterBy.cuisineType },
                    { $or: hashtags }

                ]
            }
        }
        console.log('fff', queryToMongo);
        return mongoService.connect()
            .then(db => db.collection(GROUP_COLLECTION).find(queryToMongo).sort().toArray())
            .then(groups => {
                console.log('groups are', groups)
                return groups
            })


    }

    else return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION).find({}).toArray())
}

function getById(groupId) {
    const _id = new ObjectId(groupId)
    console.log('id of group to get', _id)
    return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION).findOne({ _id }))
        .then(group => {
            console.log('group selected is', group)
            return group
        })
}

function update(group) {
    console.log('group to update is', group)
    group._id = new ObjectId(group._id)
    return getCollection()
        .updateOne({ _id: group._id }, { $set: group })
}

function getCollection() {
    return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION))

}

function add(group) {
    group.users = []
    group.recipes = []
    group.pendingUsers = []
    group.admin = new ObjectId(group.admin)
    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION).insertOne(group)
                .then(result => {
                    console.log('result from database is', result.ops[0])
                    return result.ops[0]
                })
        })
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
    console.log('asd', group._id);

    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION)
                .updateOne({ _id: group._id }, { $push: { pendingUsers: ids.userId } })
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

function addRecipeToGroup(recipeId, groupId) {
    const _id = new ObjectId(groupId)
    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION).updateOne(
                { _id },
                { $push: { recipes: recipeId } }
            )
        })
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
    removeRecipeFromGroup
}