import * as types from '../actionTypes';
import * as api from './../../utils/moreRecipeAPI';

export const getTopRecipesSuccess = recipes => ({
  type: types.GET_TOP_RECIPES,
  recipes
});

export const getTopRecipes = () => dispatch =>
  api.getTopRecipes().then((res) => {
    const recipes = res.data;
    dispatch(getTopRecipesSuccess(recipes));
  });

export const getOneRecipeSuccess = recipes => ({
  type: types.GET_ONE_RECIPE,
  recipes
});

export const getOneRecipe = recipeId => dispatch =>
  api.getOneRecipe(recipeId).then((res) => {
    const recipes = res.data;
    dispatch(getOneRecipeSuccess(recipes));
  });

export const getAllRecipesSuccess = recipes => ({
  type: types.GET_ALL_RECIPES,
  recipes
});

export const getAllRecipes = () => dispatch =>
  api.getAllRecipes().then((res) => {
    const recipes = res.data;
    dispatch(getAllRecipesSuccess(recipes));
  });

export const updateRecipeSuccess = (recipes, id) => ({
  type: types.UPDATE_RECIPE_SUCCESS,
  recipes,
  id
});

export const updateRecipeFailure = error => ({
  type: types.UPDATE_RECIPE_FAILURE,
  error
});

export const updateRecipe = (id, recipes) => dispatch =>
  api
    .updateRecipeRequest(id, recipes)
    .then((res) => {
      console.log(res);
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

export const addRecipesSuccess = recipes => ({
  type: types.ADD_RECIPE_SUCCESS,
  recipes
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
        return dispatch(addRecipesSuccess({
          message: res.data.message,
          recipes: res.data.createdRecipe
        }));
      }
    })
    .catch((error) => {
      dispatch(addRecipesFailure(error.data));
    });
