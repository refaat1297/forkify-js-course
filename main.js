import {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
  addBookmark,
  deleteBookmark,
  uploadRecipe
} from './src/js/model.js'
import RecipeView from "./src/js/views/recipeView.js";
import SearchView from "./src/js/views/searchView.js";
import ResultsView from "./src/js/views/resultsView.js";
import BookmarksView from "./src/js/views/bookmarksView.js";
import PaginationView from "./src/js/views/paginationView.js";
import AddRecipeView from "./src/js/views/addRecipeView.js";
import addRecipeView from "./src/js/views/addRecipeView.js";
import {MODAL_CLOSE_SEC} from "./src/js/config.js";


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1)
    if (!id) return

    ResultsView.update(getSearchResultsPage())
    BookmarksView.update(state.bookmarks)

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
  RecipeView.update(state.recipe)
}

const controlAddBookmark = function () {
  if (!state.recipe.bookmarked) addBookmark(state.recipe)
  else deleteBookmark(state.recipe.id)
  RecipeView.update(state.recipe)
  BookmarksView.render(state.bookmarks)
}

const controlBookmarks = function () {
  BookmarksView.render(state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
  try {
    AddRecipeView.renderSpinner()
    await uploadRecipe(newRecipe)

    RecipeView.render(state.recipe)
    AddRecipeView.renderMessage()

    BookmarksView.render(state.bookmarks)

    window.history.pushState(null, '', `#${state.recipe.id}`)

    setTimeout(() => {
      AddRecipeView._toggleWindow()
    }, MODAL_CLOSE_SEC * 1000)
  } catch (err) {
    console.error(err)
    addRecipeView.renderError(err.message)
  }
}

const init = () => {
  BookmarksView.addHandlerRender(controlBookmarks)
  RecipeView.addHandlerRender(controlRecipes)
  RecipeView.addHandlerUpdateServings(controlServings)
  RecipeView.addHandlerAddBookmark(controlAddBookmark)
  SearchView.addHandlerSearch(controlSearchResults)
  PaginationView.addHandlerClick(controlPagination)
  AddRecipeView.addHandlerUpload(controlAddRecipe)
}

init()



