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

export const updateRecipe = (id, recipe) => dispatch =>
  api.updateRecipe(recipe, id).then((res) => {
    console.log(res);
    const recipes = res.data;
    // dispatch(updateRecipe(recipeId, recipes));
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
        return dispatch(addRecipesSuccess(res.recipes));
      }
    })
    .catch((error) => {
      dispatch(addRecipesFailure(error.data));
    });
