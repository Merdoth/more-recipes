import axios from 'axios';
import swal from 'sweetalert';
import {
  UPVOTE_RECIPE_SUCCESS,
  UPVOTE_RECIPE_FAILURE,
  DOWNVOTE_RECIPE_FAILURE,
  DOWNVOTE_RECIPE_SUCCESS
} from '../actionTypes';

/**
 * @param {object} error
 *
 * @returns {Object} payload
 *
 */
export const upvoteRecipeFailure = error => ({
  type: UPVOTE_RECIPE_FAILURE,
  error
});

/**
 * @param {object} recipe
 *
 * @returns {Object} payload
 *
 */
export const upvoteRecipeSuccess = recipe => ({
  type: UPVOTE_RECIPE_SUCCESS,
  recipe
});

/**
 *
 * @description dispatches an action to upvote a recipe
 *
 * @param {Integer} id
 * @param {object } callback
 *
 * @returns {undefined}
 */
// export const upvote =
export const upvoteRecipe = id => dispatch =>
  axios
    .post(`/api/v1/votes/${id}/upvotes`)
    .then((res) => {
      if (res) {
        dispatch(upvoteRecipeSuccess(res.data.recipe));
      }
    })
    .catch((error) => {
      dispatch(upvoteRecipeFailure(error));
    });

/**
 * @param {object} error
 *
 * @returns {Object} payload
 *
 */
export const downvoteRecipeFailure = error => ({
  type: DOWNVOTE_RECIPE_FAILURE,
  error
});

/**
 *
 * @param {object} recipes
 *
 * @returns {undefined}
 */
export const downvoteRecipeSuccess = recipes => ({
  type: DOWNVOTE_RECIPE_SUCCESS,
  payload: recipes
});

/**
 *
 * @description dispatches an action to downvote a recipe
 *
 * @param {Integer} id
 * @param {object } callback
 *
 * @returns {undefined}
 */
export const downVoteRecipe = id => dispatch =>
  axios
    .post(`/api/v1/votes/${id}/downvotes`)
    .then((res) => {
      if (res) {
        dispatch(downvoteRecipeSuccess(res.data.recipe));
      }
    })
    .catch((error) => {
      dispatch(downvoteRecipeFailure(error));
    });
