const mongoService = require('./mongo-service')
const GroupService = require('../services/group-service')
const ObjectId = require('mongodb').ObjectId;
const RECIPE_COLLECTION = 'recipes'

var recipes = require('../data/recipes.json')
// _addMany()

function _addMany() {
    console.log('recipes are', recipes)
    return mongoService.connect()
        .then(db => db.collection(RECIPE_COLLECTION).insert(recipes))
        .then(res => {
            recipe._id = res.insertedId
            return recipe
        })
}

function query() {
    return mongoService.connect()
        .then(db => db.collection(RECIPE_COLLECTION).find({}).toArray())
}

function getById(recipeId) {
    const _id = new ObjectId(recipeId)
    return mongoService.connect()
        .then(db => db.collection(RECIPE_COLLECTION).findOne({ _id }))
}

function update(recipe) {
    recipe._id = new ObjectId(recipe._id)
    return mongoService.connect()
        .then(db => {
            return db.collection(RECIPE_COLLECTION)
                .updateOne({ _id: recipe._id }, { $set: recipe })
        })
}

function add(payload) {
    payload.recipe.rating = 0
    payload.recipe.createdAt = new Date().getTime()
    return mongoService.connect()
        .then(db => {
            return db.collection(RECIPE_COLLECTION)
                .insertOne(payload.recipe, () => {
                    if (payload.groupId) {
                        return GroupService.addRecipeToGroup(payload.recipe._id, payload.groupId)
                            .then(() => payload.recipe)
                    }
                    return payload.recipe
                })
        })
}

function remove(recipeId) {
    return mongoService.connect()
        .then(db => {
            db.collection(RECIPE_COLLECTION).remove({ _id: ObjectId(recipeId) })
        })
}

module.exports = {
    query,
    getById,
    update,
    add,
    remove,
}