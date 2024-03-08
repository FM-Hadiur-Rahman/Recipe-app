import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import { async } from 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    //0 Update results view to mark selected search result
    resultsView.update(model.getSearchResult());
    bookmarksView.update(model.state.bookmarks);
    //Loading recipe
    await model.loadRecipe(id);
    //TEST PURPOSE

    //Rendering recipe
    recipeView.render(model.state.recipe);
    // const recipeView= new recipeView(model.state.recipe)
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // searchView.clearInput();
    //Load search results
    await model.loadSearchResults(query);
    //render results

    resultsView.render(model.getSearchResult());

    //render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
const controlPagination = function (goToPage) {
  //render new results according to pagination

  resultsView.render(model.getSearchResult(goToPage));

  //render new pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings (In state)
  model.updateServings(newServings);
  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlAddBookmarked = function () {
  //1) ADD / Remove Bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);
  // Update Recipe view
  recipeView.update(model.state.recipe);
  //3) Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show spinner
    addRecipeView.renderSpinner();

    //upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //Render Recipe
    recipeView.render(model.state.recipe);
    //success message
    addRecipeView.renderMessage();
    //REnder bookmark
    bookmarksView.render(model.state.bookmarks);
    //Change id in the url

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back()

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥💥', err);
    addRecipeView.renderError(err.message);
  }
};
const newRecipe = function () {
  console.log('new Recipe');
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddbookmark(controlAddBookmarked);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newRecipe();
};
init();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
