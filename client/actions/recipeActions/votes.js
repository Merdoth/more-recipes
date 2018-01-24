import axios from 'axios';
import {
  UPVOTE_RECIPE,
  UPVOTE_RECIPE_ERRORS,
  DOWNVOTE_RECIPE_ERRORS,
  DOWNVOTE_RECIPE
} from '../actionTypes';

export const upvoteRecipeError = data => ({
  type: UPVOTE_RECIPE_ERRORS,
  payload: data
});

export const upvoteRecipeAction = data => ({
  type: UPVOTE_RECIPE,
  payload: data
});

export const downvoteRecipeError = data => ({
  type: DOWNVOTE_RECIPE_ERRORS,
  payload: data
});

export const downvoteRecipeAction = data => ({
  type: DOWNVOTE_RECIPE,
  payload: data
});

export const upvoteRecipe = (id, callback) => (dispatch) => {
  dispatch(upvoteRecipeError(null));
  dispatch(upvoteRecipeAction({}));
  return axios
    .post(
      `/api/v1/recipes/${id}/votes`,
      { voteType: 'upvotes' },
    )
    .then((res) => {
      if (res) {
        dispatch(upvoteRecipeAction({
          upVotes: { message: res.data.message }
        }));
        callback(true);
      }
    })
    .catch((error) => {
      dispatch(upvoteRecipeError({
        errors: {
          status: error.response.status,
          message: error.response.data.message
        }
      }));
      callback(false);
    });
};

export const downVoteRecipe = (id, callback) => (dispatch) => {
  dispatch(downvoteRecipeError(null));
  dispatch(downvoteRecipeAction({}));
  return axios
    .post(
      `/api/v1/recipes/${id}/votes`,
      { voteType: 'downvotes' },
    )
    .then((res) => {
      if (res) {
        dispatch(downvoteRecipeAction({
          downVotes: { message: res.data.message }
        }));
        callback(true);
      }
    })
    .catch((error) => {
      dispatch(downvoteRecipeError({
        errors: {
          status: error.response.status,
          message: error.response.data.message
        }
      }));
      callback(false);
    });
};
