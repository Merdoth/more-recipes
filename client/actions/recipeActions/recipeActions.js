import * as types from '../actionTypes';
import * as api from './../../utils/moreRecipeAPI';

export const getTopRecipesSuccess = recipes => ({
  type: types.GET_TOP_RECIPES,
  recipes
});
export const getTopRecipes = () => (dispatch) => {
  api.getTopRecipes().then((res) => {
    console.log('func called!', res.data);

    dispatch(getTopRecipesSuccess(res.data));
  });
};
