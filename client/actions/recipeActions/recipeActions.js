import * as types from '../actionTypes';
import * as api from './../../utils/moreRecipeAPI';

export const getTopRecipesSuccess = recipes => ({
  type: types.GET_TOP_RECIPES,
  recipes
});

export const addRecipesSuccess = recipes => ({
  type: types.ADD_RECIPE_SUCCESS,
  recipes
});

export const addRecipesFailure = error => ({
  type: types.ADD_RECIPE_FAILURE,
  error
});

export const getTopRecipes = () => (dispatch) => {
  api.getTopRecipes().then((res) => {
    dispatch(getTopRecipesSuccess(res.data));
  });
};

export const addRecipes = data => dispatch =>
  api
    .addRecipeRequest(data)
    .then((res) => {
      if (res) {
        return dispatch(addRecipesSuccess(res.data));
      }
    })
    .catch((error) => {
      dispatch(addRecipesFailure(error.data));
    });
