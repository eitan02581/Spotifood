import UtilService from './UtilService.js'


const RECIPE_ROUTE = (process.env.NODE_ENV !== 'development') ? '/recipe' : 'http://localhost:3003/recipe'

function getRecipeById(recipeId){
    return axios.get(`${RECIPE_ROUTE}/${recipeId}`).then(recipe => recipe.data)
}

export default {
    getRecipeById
} 