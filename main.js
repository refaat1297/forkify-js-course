import { state, loadRecipe, loadSearchResults, getSearchResultsPage, updateServings } from './src/js/model.js'
import RecipeView from "./src/js/views/recipeView.js";
import SearchView from "./src/js/views/searchView.js";
import ResultsView from "./src/js/views/resultsView.js";
import PaginationView from "./src/js/views/paginationView.js";


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
    const query = SearchView.getQuery()
    if (!query) return

    ResultsView.renderSpinner()
    await loadSearchResults(query)

    ResultsView.render(getSearchResultsPage())
    PaginationView.render(state.search)
  } catch (err) {
    console.error(err)
  }
}

const controlPagination = function (goToPage) {
  ResultsView.render(getSearchResultsPage(goToPage))
  PaginationView.render(state.search)
}


const controlServings = function (newServings) {
  // update recipe servings
  updateServings(newServings)

  // update the recipe view
  RecipeView.render(state.recipe)
}

const init = () => {
  RecipeView.addHandlerRender(controlRecipes)
  RecipeView.addHandlerUpdateServings(controlServings)
  SearchView.addHandlerSearch(controlSearchResults)
  PaginationView.addHandlerClick(controlPagination)
}

init()



