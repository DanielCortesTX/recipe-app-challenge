import { initializeDisplayPage } from './views'
import { resetDisplay } from './recipes'

const recipeId = location.hash.substring(1)

initializeDisplayPage(recipeId)

document.querySelector("#to-edit").addEventListener('click', () => {
    location.assign(`/edit.html#${recipeId}`)
})

document.querySelector("#to-home").addEventListener('click', () => {
    location.assign('/')
})

document.querySelector('#reset-button').addEventListener('click', () => {
    resetDisplay(recipeId)
    const ingredientsList = document.querySelector('#ingredient-list')
    const stepsList = document.querySelector('#steps-list')
    ingredientsList.innerHTML = ''
    stepsList.innerHTML = ''
    initializeDisplayPage(recipeId)
})