import { state, loadRecipe } from './src/js/model.js'
import RecipeView from "./src/js/views/recipeView.js";


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1)
    if (!id) return

    RecipeView.renderSpinner()

    // 1) Loading recipe
    await loadRecipe(id)

    // 2) Rendering recipe
    RecipeView.render(state.recipe)

  } catch (err) {
    RecipeView.renderError()
  }
};

const init = () => {
  RecipeView.addHandlerRender(controlRecipes)
}

init()



