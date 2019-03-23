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
                            .then(() => payload.recipe._id)
                    }
                    return payload.recipe._id
                })
        })
}

function remove(recipeId) {
    return mongoService.connect()
        .then(db => {
            return db.collection(RECIPE_COLLECTION).remove({ _id: ObjectId(recipeId) })
        })
}

function addImg(recipeId, Imgs) {
    const _id = new ObjectId(recipeId)
    const imgsUrl = Imgs.map(img => img.url);
    return mongoService.connect()
        .then(db => {
            console.log('after connection mongo')
            // return db.collection(RECIPE_COLLECTION).findOneAndUpdate(
            //     { _id },
            //     { $push: { imgs: imgsUrl[0] } }
            // )
            // // return db.collection(RECIPE_COLLECTION).updateMany(
            //     { _id },
            //     { $push: { imgs: { $each: imgsUrl } } }
            // )
            return db.collection(RECIPE_COLLECTION).findOne({ _id })
        })
        .then(res => {
            console.log('imgs from mongo',res.imgs)
            console.log('imgs from upload',imgsUrl)
            var updatedImgs = res.imgs.concat(imgsUrl)
            console.log('updated imgs from mongo with uploads',updatedImgs)
            return mongoService.connect()
                .then(db => {
                    db.collection(RECIPE_COLLECTION).updateOne(
                        { _id },
                        { $set: { imgs: updatedImgs } }
                    )
                })
        })
}

module.exports = {
    query,
    getById,
    update,
    add,
    remove,
    addImg
}