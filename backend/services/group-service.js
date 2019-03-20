const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const GROUP_COLLECTION = 'groups'

var UtilService = require('./util-service.js');
var groups = require('../data/groups.json')
// _addMany()

function _addMany() {
    return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION).insert(groups))
        .then(res => {
            group._id = res.insertedId
            return group
        })
}

function query() {
    return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION).find({}).toArray())
}

function getById(groupId) {
    const _id = new ObjectId(groupId)
    return mongoService.connect()
        .then(db => db.collection(GROUP_COLLECTION).findOne({ _id }))
}

function update(group) {
    console.log('group to update is', group)
    group._id = new ObjectId(group._id)
    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION)
                .updateOne({ _id: group._id }, { $set: group })
        })
}

function add(group) {
    group.users = []
    group.recipes = []
    return mongoService.connect()
        .then(db => {
            return db.collection(GROUP_COLLECTION).insertOne(group)
        })
}

function remove(groupId) {
    return mongoService.connect()
        .then(db => {
            db.collection(GROUP_COLLECTION).remove({ _id: ObjectId(groupId) })
        })
}

module.exports = {
    query,
    getById,
    update,
    add,
    remove,
}