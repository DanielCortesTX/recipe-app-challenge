import { createRecipe } from './recipes'
import { renderRecipes } from './views'

renderRecipes()

document.querySelector('#add-recipe').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

// test for build