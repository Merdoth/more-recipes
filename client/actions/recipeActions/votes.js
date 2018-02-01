import axios from 'axios';
import {
  UPVOTE_RECIPE_SUCCESS,
  UPVOTE_RECIPE_FAILURE,
  DOWNVOTE_RECIPE_FAILURE,
  DOWNVOTE_RECIPE_SUCCESS
} from '../actionTypes';
import { recipeValidator } from '../../../server/middleware/validateInput';

/**
 * @param {object} error
 *
 * @returns {Object} payload
 *
 */
export const upvoteRecipeFailure = error => ({
  type: UPVOTE_RECIPE_FAILURE,
  error: recipeValidator
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
 * @param {object} error
 *
 * @returns {Object} payload
 *
 */
export const downvoteRecipeFailure = error => ({
  type: DOWNVOTE_RECIPE_FAILURE,
  error: recipeValidator
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
 * @description dispatches an action to upvote a recipe
 *
 * @param {Integer} id
 * @param {object } callback
 *
 * @returns {undefined}
 */
export const upvoteRecipe = (id, callback) => (dispatch) => {
  dispatch(upvoteRecipeFailure(null));
  dispatch(upvoteRecipeSuccess({}));
  return axios
    .post(`/api/v1/recipes/${id}/votes`, { voteType: 'upvotes' })
    .then((res) => {
      if (res) {
        dispatch(upvoteRecipeSuccess({
          upVotes: { message: res.recipes.message }
        }));
        callback(true);
      }
    })
    .catch((error) => {
      dispatch(upvoteRecipeFailure({
        errors: {
          status: error.response.status,
          message: error.response.recipes.message
        }
      }));
      callback(false);
    });
};

/**
 *
 * @description dispatches an action to downvote a recipe
 *
 * @param {Integer} id
 * @param {object } callback
 *
 * @returns {undefined}
 */
export const downVoteRecipe = (id, callback) => (dispatch) => {
  dispatch(downvoteRecipeFailure(null));
  dispatch(downvoteRecipeSuccess({}));
  return axios
    .post(`/api/v1/recipes/${id}/votes`, { voteType: 'downvotes' })
    .then((res) => {
      if (res) {
        dispatch(downvoteRecipeSuccess({
          downVotes: { message: res.recipes.message }
        }));
        callback(true);
      }
    })
    .catch((error) => {
      dispatch(downvoteRecipeFailure({
        errors: {
          status: error.response.status,
          message: error.response.recipes.message
        }
      }));
      callback(false);
    });
};
