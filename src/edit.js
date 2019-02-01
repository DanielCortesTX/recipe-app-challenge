import { updateRecipe, createIngredient, createStep, deleteRecipe } from './recipes'
import { initializeEditPage } from './views'

const recipeTitle = document.querySelector('#recipe-title')
// const ingredientInput = document.querySelector('#ingredient-input')
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)

document.querySelector('#new-ingredient').addEventListener('submit', (e) => {
  const ingredientText = e.target.elements.ingredient.value
  e.preventDefault
  createIngredient(recipeId, ingredientText)
})

document.querySelector('#new-step').addEventListener('submit', (e) => {
  const stepText = e.target.elements.step.value
  e.preventDefault
  createStep(recipeId, stepText)
})

document.querySelector('#delete-recipe').addEventListener('click', (e) => {
  e.preventDefault
  console.log('yes')
  deleteRecipe(recipeId)
  location.assign('/')
})

recipeTitle.addEventListener('input', (e) => {
  updateRecipe(recipeId, {
    title: e.target.value
  })
})

window.addEventListener('storage', (e) => {
  if(e.key === 'recipes'){
    initializeEditPage(recipeId)
  }
})

document.querySelector("#to-home").addEventListener('click', () => {
  location.assign('/')
})