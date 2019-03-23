const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const GROUP_COLLECTION = 'groups'

var UtilService = require('./util-service.js');
var groups = require('../data/groups.json')
_resetDb()

function _resetDb(){
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

        // TODO: HOW TO USE $OR , FOR RETURNING MANY OPTIONS
        if (filterBy.general) {
            if (filterBy.general.split(',').length > 1) filterBy.general = filterBy.general.split(',')
            else filterBy.general = [filterBy.general]
            queryToMongo.title = new RegExp(filterBy.general, 'i');
            console.log(filterBy.general);
            if (filterBy.general.length >= 1)
                var arr = filterBy.general.map(el => { return { title: new RegExp(el, 'i') } })

            queryToMongo = {
                $or: arr
            }
        }

        console.log('fff', queryToMongo);
        return mongoService.connect()
            .then(db => db.collection(GROUP_COLLECTION).find(queryToMongo).sort().toArray())


    }

    else return mongoService.connect()
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
    group.hashtags = []
    group.pendingRequests = []
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
    addRecipeToGroup,
    removeRecipeFromGroup
}