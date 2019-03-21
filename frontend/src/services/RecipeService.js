// import UtilService from './UtilService.js'
import axios from 'axios'

const RECIPE_ROUTE = (process.env.NODE_ENV !== 'development') ? '/recipe' : 'http://localhost:3003/recipe'

function getRecipeById(recipeId){
    console.log('recipe id',recipeId)
    return axios.get(`${RECIPE_ROUTE}/${recipeId}`).then(recipe => {
        console.log('recipe data',recipe.data)
        return recipe.data})
}

export default {
    getRecipeById
} 