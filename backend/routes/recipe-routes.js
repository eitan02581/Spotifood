const RecipeService = require('../services/recipe-service')


function addRecipeRoutes(app) {

    app.get('/recipe', (req, res) => {
        RecipeService.query()
            .then(recipes => {
                console.log('answer from query', recipes)
                return res.json(recipes)
            })
    })

    app.get('/recipe/:recipeId', (req,res) => {
        let recipeId = req.params.recipeId
        console.log('recipe id to get is', recipeId)
        RecipeService.getById(recipeId)
            .then(recipe => {
                console.log('recipe retrieved is', recipe)
                res.json(recipe)
            })
    })

    app.post('/recipe', (req,res) => {
        let payload = req.body.recipe
        RecipeService.add(payload)
            .then(updatedrecipe => {
                // console.log('recipe added and is', res.json(updatedrecipe))
                res.json(updatedrecipe)
            })
    })

    app.delete('/recipe/:recipeId', (req, res) => {
        const grouopId = req.params.recipeId;
        RecipeService.remove(grouopId)
            .then(() => res.end(`recipe ${grouopId} Deleted `))
    })

    app.put('/recipe/:recipeId', (req, res) => {
        const recipe = req.body.recipe
        console.log('request recipe to update', recipe)
        RecipeService.update(recipe)
            .then(recipe => {
                console.log('successfuly updated recipe',recipe)
                return res.json(recipe)
            })
    })

}

module.exports = addRecipeRoutes