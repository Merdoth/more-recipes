import swal from 'sweetalert';
import * as types from '../actionTypes';

import * as api from './../../utils/moreRecipeAPI';

export const getTopRecipesSuccess = recipes => ({
  type: types.GET_TOP_RECIPES,
  recipes
});

export const getTopRecipes = () => dispatch =>
  api.getTopRecipes().then((response) => {
    const recipes = response.data;
    dispatch(getTopRecipesSuccess(recipes));
  });

export const getOneRecipeSuccess = recipe => ({
  type: types.GET_ONE_RECIPE,
  recipe
});
export const getOneRecipeFailure = error => ({
  type: types.GET_ONE_RECIPE_FAILURE,
  error
});

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

export const deleteRecipeSuccess = message => ({
  type: types.DELETE_RECIPE_SUCCESS,
  message
});

export const deleteRecipeFailure = error => ({
  type: types.DELETE_RECIPE_FAILURE,
  error
});

export const deleteRecipe = id => dispatch =>
  api
    .deleteRecipe(id)
    .then((res) => {
      dispatch(deleteRecipeSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(deleteRecipeFailure(error));
    });

export const getAllRecipesSuccess = recipes => ({
  type: types.GET_ALL_RECIPES,
  recipes
});

export const getAllRecipes = () => dispatch =>
  api.getAllRecipes().then((res) => {
    const recipes = res.data.recipesFound;
    dispatch(getAllRecipesSuccess(recipes));
  });

export const updateRecipeSuccess = recipe => ({
  type: types.UPDATE_RECIPE_SUCCESS,
  recipe
});

export const updateRecipeFailure = error => ({
  type: types.UPDATE_RECIPE_FAILURE,
  error
});

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

export const addRecipesSuccess = recipe => ({
  type: types.ADD_RECIPE_SUCCESS,
  recipe
});

export const addRecipesFailure = error => ({
  type: types.ADD_RECIPE_FAILURE,
  error
});

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
