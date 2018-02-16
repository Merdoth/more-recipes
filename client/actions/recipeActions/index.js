import swal from 'sweetalert';
import * as types from '../actionTypes';
import history from '../../utils/history';
import * as api from './../../utils/moreRecipeAPI';

/**
 *
 * @param { Object } recipe
 *
 * @returns { undefined }
 */
export const getOneRecipeSuccess = recipe => ({
  type: types.GET_ONE_RECIPE,
  payload: recipe
});
/**
 *
 * @param { Object } error
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
 * @param { Number } userId
 * @param { Number } recipeId
 *
 * @returns { undefined }
 */
export const getOneRecipe = (userId, recipeId) => dispatch =>
  api
    .getOneRecipe(userId, recipeId)
    .then((res) => {
      const recipe = res.data.recipesFound || res.data.updatedRecipes;
      dispatch(getOneRecipeSuccess(recipe));
    })
    .catch((error) => {
      dispatch(getOneRecipeFailure(error.data));
    });

/**
 *
 * @param { Object } message
 *
 * @returns { undefined }
 *
 */
export const deleteRecipeSuccess = message => ({
  type: types.DELETE_RECIPE_SUCCESS,
  message
});

/**
 *
 * @param { Object } error
 *
 * @returns { undefined } payload
 *
 */
export const deleteRecipeFailure = error => ({
  type: types.DELETE_RECIPE_FAILURE,
  error
});

/**
 * @description this dispatches an action that deletes a recipe
 *
 * @param { Number } id
 *
 * @returns { Object } payload
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
 * @param { Object } recipes
 *
 * @returns { undefined }
 *
 */
export const getAllRecipesSuccess = recipes => ({
  type: types.GET_ALL_RECIPES,
  recipes
});

/**
 * @description this dispatches an action that gets all recipes
 *
 * @param { Number } page
 * @param { Number } offset
 * @param { Number } limit
 *
 * @returns { Object } payload
 *
 */
export const getAllRecipes = (page, offset, limit) => dispatch =>
  api.getAllRecipes(page, offset, limit).then((res) => {
    dispatch(getAllRecipesSuccess(res.data));
  });

/**
 * @param { Object } recipes
 *
 * @returns { undefined }
 *
 */
export const getUserRecipesSuccess = recipes => ({
  type: types.GET_USER_RECIPES_SUCCESS,
  recipes
});

/**
 * @param { Object } error
 *
 * @returns { undefined }
 *
 */
export const getUserRecipesFailure = error => ({
  type: types.GET_USER_RECIPES_FAILURE,
  error
});
/**
 *
 * @description dispatches action to get one recipe
 *
 * @param { Number } page
 * @param { Number } offset
 * @param { Number } limit
 *
 * @returns { Object } payload
 */
export const getUserRecipes = (page, offset, limit) => dispatch =>
  api
    .getUserRecipes(page, offset, limit)
    .then((res) => {
      if (res) {
        dispatch(getUserRecipesSuccess(res.data));
      }
    })

    .catch((error) => {
      dispatch(getUserRecipesFailure(error.data));
    });
/**
 *
 * @param { Object } recipe
 *
 * @returns { undefined }
 *
 */
export const updateRecipeSuccess = recipe => ({
  type: types.UPDATE_RECIPE_SUCCESS,
  recipe
});

/**
 *
 * @param { Object } error
 *
 * @returns { undefined }
 *
 */
export const updateRecipeFailure = error => ({
  type: types.UPDATE_RECIPE_FAILURE,
  error
});

/**
 * @description this dispatches an action that updates recipes
 *
 * @param { Number } id
 * @param { Object } recipes
 *
 * @returns { Object } payload
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
 * @param { Object } recipe
 *
 * @returns { undefined }
 *
 */
export const addRecipesSuccess = recipe => ({
  type: types.ADD_RECIPE_SUCCESS,
  recipe
});

/**
 *
 * @param { Object } error
 *
 * @returns { undefined }
 *
 */
export const addRecipesFailure = error => ({
  type: types.ADD_RECIPE_FAILURE,
  error
});

/**
 * @description this dispatches an action that adds a recipe
 *
 * @param { Object } recipes
 *
 * @returns { Object } payload
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
        history.push('/recipes');
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

/**
 *
 * @param { Object } favourite
 *
 * @returns { undefined }
 *
 */
export const addFavouriteSuccess = favourite => ({
  type: types.ADD_FAVOURITE_SUCCESS,
  favourite
});

/**
 *
 * @param { Object } error
 *
 * @returns { undefined }
 *
 */
export const addFavouriteFailure = error => ({
  type: types.ADD_FAVOURITE_ERROR,
  error
});

/**
 * @description this dispatches an action that adds a recipe
 *
 * @param { Number } id
 *
 * @returns { Object } payload
 *
 */
export const addFavourite = id => dispatch =>
  api
    .addFavouriteRequest(id)
    .then((res) => {
      if (res) {
        dispatch(addFavouriteSuccess(res.data.favourite));
      }
    })
    .catch((error) => {
      dispatch(addFavouriteFailure(error));
    });
/**
 *
 * @param { Object } favourite
 *
 * @returns { undefined } payload
 *
 */
export const removeFavouriteSuccess = favourite => ({
  type: types.REMOVE_FAVOURITE_SUCCESS,
  favourite
});

/**
 *
 * @param { Object } error
 *
 * @returns { undefined }
 *
 */
export const removeFavouriteFailure = error => ({
  type: types.REMOVE_FAVOURITE_FAILURE,
  error
});

/**
 * @description this dispatches an action that adds a recipe
 *
 * @param { Number } id
 *
 * @returns { Object } payload
 *
 */
export const removeFavourite = id => dispatch =>
  api
    .removeFavouriteRequest(id)
    .then((res) => {
      if (res) {
        dispatch(removeFavouriteSuccess(res.data.favourite));
      }
    })
    .catch((error) => {
      dispatch(removeFavouriteFailure(error));
    });
/**
 *
 * @param { Object } favourite
 *
 * @returns { undefined }
 *
 */
export const getFavouriteSuccess = favourite => ({
  type: types.GET_FAVOURITE_SUCCESS,
  favourite
});

/**
 *
 * @param { Object } error
 *
 * @returns { undefined }
 *
 */
export const getFavouriteFailure = error => ({
  type: types.GET_FAVOURITE_FAILURE,
  error
});

/**
 * @description this dispatches an action that adds a recipe
 *
 * @param { Number } id
 *
 * @returns { Object } payload
 *
 */
export const getFavourite = id => dispatch =>
  api
    .getFavouriteRequest(id)
    .then((res) => {
      if (res) {
        dispatch(getFavouriteSuccess(res.data.favourites));
      }
    })
    .catch((error) => {
      dispatch(getFavouriteFailure(error));
    });

/**
 *
 * @param { Object } recipes
 *
 * @returns { undefined }
 *
 */
export const getMostVotedSuccess = recipes => ({
  type: types.GET_MOST_VOTED_SUCCESS,
  recipes
});

/**
 *
 * @param { Object } error
 *
 * @returns { undefined }
 *
 */
export const getMostVotedFailure = error => ({
  type: types.GET_MOST_VOTED_FAILURE,
  error
});

/**
 * @description this dispatches an action that gets most upvoted recipes a recipe
 *
 * @param { Number } id
 *
 * @returns {Object} payload
 *
 */
export const getMostVoted = () => dispatch =>
  api
    .getMostVotedRequest()
    .then((res) => {
      if (res) {
        dispatch(getMostVotedSuccess(res.data));
      }
    })
    .catch((error) => {
      dispatch(getMostVotedFailure(error));
    });
/**
 *
 * @param { Object } recipe
 *
 * @returns { undefined }
 */
export const searcRecipeSuccess = recipe => ({
  type: types.SEARCH_RECIPE_SUCCESS,
  payload: recipe,
});
/**
 *
 * @param { Object } error
 *
 * @returns { undefined }
 */
export const searchRecipeFailure = error => ({
  type: types.SEARCH_RECIPE_FAILURE,
  error
});

/**
 *
 * @description dispatches action to get one recipe
 *
 * @param { String } name
 *
 * @param {  Number  } limit
 * @param {  Number  } offset
 *
 * @returns { Object } payload
 */
export const searchRecipe = (name, limit, offset) => dispatch =>
  api
    .searchRecipeApi(name, limit, offset)
    .then((res) => {
      dispatch(searcRecipeSuccess(res.data));
    })
    .catch((error) => {
      dispatch(searchRecipeFailure(error.data));
    });
