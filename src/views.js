import moment from 'moment'
import { getRecipes, removeIngredient, removeStep, toggleIngredient, toggleStep } from './recipes.js'

//////////////////////////////////////////////////////////
///////////////// RENDERING FOR EDIT PAGE ////////////////
//////////////////////////////////////////////////////////

const generateRecipeDOM = (recipe) => {
    const titleElement = document.createElement('p')
    const createdElement = document.createElement('p')
    const bodyElement = document.createElement('a')
    const createdTime = moment(recipe.createdAt).fromNow()

    titleElement.textContent = recipe.title
    bodyElement.appendChild(titleElement)

    createdElement.textContent = `Created ${createdTime}`
    createdElement.classList.add('recipe-item__subtitle')
    bodyElement.appendChild(createdElement)

    bodyElement.setAttribute('href', `/display.html#${recipe.id}`)
    bodyElement.classList.add('recipe-item__title')
    bodyElement.classList.add('recipe-item')

    return bodyElement
}

const renderRecipes = () => {
    const recipesEl = document.querySelector('#recipe-list')
    const recipes = getRecipes()
    recipes.forEach((recipe) => {
        const recipeEl = generateRecipeDOM(recipe)
        recipesEl.appendChild(recipeEl)
    })
}

//////////////////////////////////////////////////////////
///////////////// RENDERING FOR EDIT PAGE ////////////////
//////////////////////////////////////////////////////////

const initializeEditPage = (recipeId) => {
    const titleElement = document.querySelector('#recipe-title')
    // const ingredientsElement = document.querySelector('#ingredient-list')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if(!recipe){
        location.assign('index.html')
    }

    titleElement.value = recipe.title
    renderIngredients(recipeId)
    renderSteps(recipeId)
}

const renderIngredients = (recipeId) => {
    const ingredientsEl = document.querySelector('#ingredient-list')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if(recipe.ingredients.length === 0){
        const noDisplay = document.createElement('p')
        noDisplay.textContent = 'No ingredients at the moment.'
        noDisplay.classList.add('empty-list-message')
        ingredientsEl.appendChild(noDisplay)
    } else {
        recipe.ingredients.forEach((ingredient) => {
            const ingredientDisplay = generateIngredientDom(ingredient, recipe)
            ingredientsEl.appendChild(ingredientDisplay)
        })
    }
}

const generateIngredientDom = (ingredient, recipe) => {
    const ingredientElement = document.createElement('label')
    const nameElement = document.createElement('span')
    const deleteButton = document.createElement('button')
    const ingredientsDisplay = document.querySelector('#ingredient-list')

    nameElement.textContent = ingredient.ingredientText
    ingredientElement.appendChild(nameElement)
    ingredientElement.classList.add('ingredient-item__title')
    ingredientElement.classList.add('ingredient-item')

    deleteButton.textContent = 'x'
    deleteButton.classList.add('button-delete')
    deleteButton.addEventListener('click', () =>{
        removeIngredient(ingredient.id, recipe)
        document.querySelector('#ingredient-list').innerHTML = ''
        renderIngredients(recipe.id)
    })
    ingredientElement.appendChild(deleteButton)
    return ingredientElement
}

const renderSteps = (recipeId) => {
    const stepsEl = document.querySelector('#steps-list')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if(recipe.steps.length === 0){
        const noDisplay = document.createElement('p')
        noDisplay.textContent = 'No steps at the moment.'
        noDisplay.classList.add('empty-list-message')
        stepsEl.appendChild(noDisplay)
    } else {
        recipe.steps.forEach((step, index) => {
            const stepDisplay = generateStepDom(step, recipe, index)
            stepsEl.appendChild(stepDisplay)
        })
    }
}

const generateStepDom = (step, recipe, index) => {
    const stepElement = document.createElement('li')
    const nameElement = document.createElement('span')
    const deleteButton = document.createElement('button')

    nameElement.textContent = `${index + 1}) ${step.stepText}`
    stepElement.appendChild(nameElement)

    stepElement.classList.add('recipe-item__title')
    stepElement.classList.add('recipe-item')

    deleteButton.textContent = 'X'
    deleteButton.classList.add('button-delete')
    deleteButton.addEventListener('click', () =>{
        removeStep(step.id, recipe)
        document.querySelector('#steps-list').innerHTML = ''
        renderSteps(recipe.id)
    })
    stepElement.appendChild(deleteButton)

    return stepElement
}

/////////////////////////////////////////////////////////////
///////////////// RENDERING FOR DISPLAY PAGE ////////////////
/////////////////////////////////////////////////////////////

const initializeDisplayPage = (recipeId) => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    const ingredientsList = document.querySelector('#ingredient-list')
    const stepsList = document.querySelector('#steps-list')

    const titleElement = document.querySelector('#recipe-title')
    titleElement.textContent = recipe.title

    recipe.ingredients.forEach((ingredient) => {
        const ingredientDisplay = generateIngredientDisplay(ingredient, recipe)
        ingredientsList.appendChild(ingredientDisplay)
    })

    recipe.steps.forEach((step, index) => {
        const stepDisplay = generateStepDisplay(step, index)
        stepsList.appendChild(stepDisplay)
    })
}

const generateStepDisplay = (step, index) => {
    const stepTitle = document.createElement('p')
    const bodyElement = document.createElement('li')

    stepTitle.textContent = `${index + 1}) ${step.stepText}`
    if(step.completed){
        bodyElement.classList.add('step-completed')
    }
    bodyElement.appendChild(stepTitle)
    bodyElement.addEventListener('click', () => {
        if(step.completed){
            bodyElement.classList.remove('step-completed')
        } else {
            bodyElement.classList.add('step-completed')
        }
        toggleStep(step) 
    })

    bodyElement.classList.add('recipe-item__title')
    bodyElement.classList.add('recipe-item')

    return bodyElement
}

const generateIngredientDisplay = (ingredient) => {
    const ingredientTitle = document.createElement('p')
    const bodyElement = document.createElement('div')
    const checkboxElement = document.createElement('input')

    checkboxElement.setAttribute('type', 'checkbox')
    checkboxElement.checked = ingredient.checked
    bodyElement.appendChild(checkboxElement)
    checkboxElement.addEventListener('change', () => {
        toggleIngredient(ingredient)
    })

    ingredientTitle.textContent = ingredient.ingredientText
    bodyElement.appendChild(ingredientTitle)

    bodyElement.classList.add('ingredient-item__title')
    bodyElement.classList.add('ingredient-item')

    return bodyElement
}

export { renderRecipes, initializeEditPage, initializeDisplayPage, renderIngredients }