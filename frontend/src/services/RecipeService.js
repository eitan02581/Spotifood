// import UtilService from './UtilService.js'
import axios from 'axios'

const RECIPE_ROUTE = (process.env.NODE_ENV !== 'development') ? '/recipe' : 'http://localhost:3007/recipe'

function getRecipeById(recipeId) {
    return axios.get(`${RECIPE_ROUTE}/${recipeId}`).then(recipe => recipe.data)
}

function updateRecipe(recipe, uploadedImgs) {
    recipe.imgs = recipe.imgs.concat(uploadedImgs);
    return axios.put(`${RECIPE_ROUTE}/${recipe._id}`, { recipe }).then(res => res.data)
}

function addRecipe(recipe, groupId, uploadedImgs) {
    recipe.imgs = recipe.imgs.concat(uploadedImgs);
    return axios.post(`${RECIPE_ROUTE}`, { recipe, groupId }).then(res => res.data)
}

export default {
    getRecipeById,
    updateRecipe,
    addRecipe,
} 