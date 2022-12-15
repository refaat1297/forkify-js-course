import { state, loadRecipe, loadSearchResults } from './src/js/model.js'
import RecipeView from "./src/js/views/recipeView.js";
import SearchView from "./src/js/views/searchView.js";
import ResultsView from "./src/js/views/resultsView.js";


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

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner()

    const query = SearchView.getQuery()
    if (!query) return

    await loadSearchResults(query)

    ResultsView.render(state.search.results)
  } catch (err) {
    console.error(err)
  }
}


const init = () => {
  RecipeView.addHandlerRender(controlRecipes)
  SearchView.addHandlerSearch(controlSearchResults)
}

init()



