import uuidv4 from 'uuid/v4'
import moment from 'moment'
import { renderIngredients, renderSteps } from './views'

let recipes = []

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try{
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        []
    }
}

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => recipes

const createRecipe = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    recipes.push({
        id,
        createdAt: timestamp,
        title: '',
        steps: [],
        ingredients: []
    })
    saveRecipes()
    return id    
}

const deleteRecipe = (recipeId) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === recipeId)

    if(recipeIndex > -1){
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

const createIngredient = (recipeId, ingredientText) => {
    const id = uuidv4()
    const recipe = recipes.find((recipe) => recipeId === recipe.id)

    recipe.ingredients.push({
        id,
        ingredientText,
        checked: false
    })
    saveRecipes()
}

const createStep = (recipeId, stepText) => {
    const id = uuidv4()
    const recipe = recipes.find((recipe) => recipeId === recipe.id)

    recipe.steps.push({
        id,
        stepText,
        completed: false
    })
    saveRecipes()
}

const removeIngredient = (ingredientId, recipe) => {
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.id === ingredientId)
    if(ingredientIndex > -1){
        recipe.ingredients.splice(ingredientIndex, 1)
        saveRecipes()
    }
}

const removeStep = (stepId, recipe) => {
    const stepIndex = recipe.steps.findIndex((step) => step.id === stepId)
    if(stepIndex > -1){
        recipe.steps.splice(stepIndex, 1)
        saveRecipes()
    }
}

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if(!recipe){
        return 
    }

    if(typeof updates.title === 'string'){
        recipe.title = updates.title
    }

    saveRecipes()
    return recipe
}

const toggleIngredient = (ingredient) => {
    ingredient.checked = !ingredient.checked
    saveRecipes()
}

const toggleStep = (step) => {
    step.completed = !step.completed
    saveRecipes()
}

const resetDisplay = (recipeId) => {
    const recipe = recipes.find((recipe) => recipeId === recipe.id)

    recipe.ingredients.forEach((ingredient) => {
        ingredient.checked = false
    })
    recipe.steps.forEach((step) => {
        step.completed = false
    })
    saveRecipes()
}

recipes = loadRecipes()

export { createRecipe, 
         getRecipes, 
         updateRecipe, 
         createIngredient, 
         removeIngredient, 
         createStep, 
         removeStep, 
         deleteRecipe, 
         toggleIngredient,
         toggleStep,
         resetDisplay
         }