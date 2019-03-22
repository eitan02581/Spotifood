// import UtilService from './UtilService.js'
import axios from 'axios'

const RECIPE_ROUTE = (process.env.NODE_ENV !== 'development') ? '/recipe' : 'http://localhost:3005/recipe'

function getRecipeById(recipeId) {
    return axios.get(`${RECIPE_ROUTE}/${recipeId}`).then(recipe => recipe.data)
}

function updateRecipe(recipe) {
    return axios.put(`${RECIPE_ROUTE}/${recipe._id}`, { recipe }).then(res => res.data)
}

function addRecipe(recipe){
    return axios.post(`${RECIPE_ROUTE}`, { recipe }).then(res => res.data)
}

export default {
    getRecipeById,
    updateRecipe,
    addRecipe
} 