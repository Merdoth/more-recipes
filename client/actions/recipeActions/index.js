import swal from 'sweetalert';
import * as types from '../actionTypes';

import * as api from './../../utils/moreRecipeAPI';

/**
 *
 * @param {object} recipes
 *
 * @returns {undefined}
 */
export const getTopRecipesSuccess = recipes => ({
  type: types.GET_TOP_RECIPES,
  recipes
});

/**
 *
 * @description dispatches action to get top recipes
 *
 * @param { object } object
 *
 * @returns { undefined }
 */
export const getTopRecipes = () => dispatch =>
  api.getTopRecipes().then((res) => {
    const recipes = res.data;
    dispatch(getTopRecipesSuccess(recipes));
  });

/**
 *
 * @param { object } recipe
 *
 * @returns { undefined }
 */
export const getOneRecipeSuccess = recipe => ({
  type: types.GET_ONE_RECIPE,
  recipe
});
/**
 *
 * @param { object } error
 *
 * @returns { undefined }
 */
export const getOneRecipeFailure = error => ({
  type: types.GET_ONE_RECIPE_FAILURE,
  error
});

/**
 *
 * @description dispatches action to get one recipe
 *
 * @param { object } recipeId
 *
 * @returns { undefined }
 */
export const getOneRecipe = recipeId => dispatch =>
  api
    .getOneRecipe(recipeId)
    .then((response) => {
      const recipe = response.data;
      dispatch(getOneRecipeSuccess(recipe));
    })
    .catch((error) => {
      dispatch(getOneRecipeFailure(error.data));
    });

/**
 *
 * @param {object} message
 *
 * @returns {undefined}
 *
 */
export const deleteRecipeSuccess = message => ({
  type: types.DELETE_RECIPE_SUCCESS,
  message
});

/**
 *
 * @param {object} error
 *
 * @returns {Object} payload
 *
 */
export const deleteRecipeFailure = error => ({
  type: types.DELETE_RECIPE_FAILURE,
  error
});

/**
 * @description this dispatches an action that deletes a recipe
 *
 * @param {Integer} id
 *
 * @returns {Object} payload
 *
 */
export const deleteRecipe = id => dispatch =>
  api
    .deleteRecipe(id)
    .then((res) => {
      dispatch(deleteRecipeSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(deleteRecipeFailure(error));
    });
/**
 * @param {Object} recipes
 *
 * @returns {Object} payload
 *
 */
export const getAllRecipesSuccess = recipes => ({
  type: types.GET_ALL_RECIPES,
  recipes
});

/**
 * @description this dispatches an action that gets all recipes
 *
 * @param {object} object
 *
 * @returns {Object} payload
 *
 */
export const getAllRecipes = () => dispatch =>
  api.getAllRecipes().then((res) => {
    const recipes = res.data.recipesFound;
    dispatch(getAllRecipesSuccess(recipes));
  });

/**
 *
 * @param {object} recipe
 *
 * @returns {Object} payload
 *
 */
export const updateRecipeSuccess = recipe => ({
  type: types.UPDATE_RECIPE_SUCCESS,
  recipe
});

/**
 *
 * @param {object} error
 *
 * @returns {Object} payload
 *
 */
export const updateRecipeFailure = error => ({
  type: types.UPDATE_RECIPE_FAILURE,
  error
});

/**
 * @description this dispatches an action that updates recipes
 *
 * @param {Integer} id
 * @param {Object} recipes
 *
 * @returns {Object} payload
 *
 */
export const updateRecipe = (id, recipes) => dispatch =>
  api
    .updateRecipeRequest(id, recipes)
    .then((res) => {
      if (res) {
        return dispatch(updateRecipeSuccess({
          message: res.data.message,
          recipes: res.data.updatedRecipe
        }));
      }
    })
    .catch((error) => {
      dispatch(updateRecipeFailure(error.data));
    });

/**
 *
 * @param {object} recipe
 *
 * @returns {Object} payload
 *
 */
export const addRecipesSuccess = recipe => ({
  type: types.ADD_RECIPE_SUCCESS,
  recipe
});

/**
 *
 * @param {object} error
 *
 * @returns {Object} payload
 *
 */
export const addRecipesFailure = error => ({
  type: types.ADD_RECIPE_FAILURE,
  error
});

/**
 * @description this dispatches an action that adds a recipe
 *
 * @param {object} recipes
 *
 * @returns {Object} payload
 *
 */
export const addRecipes = recipes => dispatch =>
  api
    .addRecipeRequest(recipes)
    .then((res) => {
      if (res) {
        dispatch(addRecipesSuccess(res.data.createdRecipe));
        swal({
          title: 'Recipe successfully added!',
          text: res.data.message,
          icon: 'success'
        });
      }
    })
    .catch((error) => {
      dispatch(addRecipesFailure(error.data));
      swal({
        title: 'Oops!',
        text: 'sorry an error occured',
        icon: 'error'
      });
    });
