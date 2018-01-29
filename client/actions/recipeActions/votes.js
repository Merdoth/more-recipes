import axios from 'axios';
import {
  UPVOTE_RECIPE_SUCCESS,
  UPVOTE_RECIPE_FAILURE,
  DOWNVOTE_RECIPE_FAILURE,
  DOWNVOTE_RECIPE_SUCCESS
} from '../actionTypes';

export const upvoteRecipeFailure = data => ({
  type: UPVOTE_RECIPE_FAILURE,
  payload: data
});

export const upvoteRecipeSuccess = data => ({
  type: UPVOTE_RECIPE_SUCCESS,
  payload: data
});

export const downvoteRecipeFailure = data => ({
  type: DOWNVOTE_RECIPE_FAILURE,
  payload: data
});

export const downvoteRecipeSuccess = data => ({
  type: DOWNVOTE_RECIPE_SUCCESS,
  payload: data
});

export const upvoteRecipe = (id, callback) => (dispatch) => {
  dispatch(upvoteRecipeFailure(null));
  dispatch(upvoteRecipeSuccess({}));
  return axios
    .post(`/api/v1/recipes/${id}/votes`, { voteType: 'upvotes' })
    .then((res) => {
      if (res) {
        dispatch(upvoteRecipeSuccess({
          upVotes: { message: res.data.message }
        }));
        callback(true);
      }
    })
    .catch((error) => {
      dispatch(upvoteRecipeFailure({
        errors: {
          status: error.response.status,
          message: error.response.data.message
        }
      }));
      callback(false);
    });
};

export const downVoteRecipe = (id, callback) => (dispatch) => {
  dispatch(downvoteRecipeFailure(null));
  dispatch(downvoteRecipeSuccess({}));
  return axios
    .post(`/api/v1/recipes/${id}/votes`, { voteType: 'downvotes' })
    .then((res) => {
      if (res) {
        dispatch(downvoteRecipeSuccess({
          downVotes: { message: res.data.message }
        }));
        callback(true);
      }
    })
    .catch((error) => {
      dispatch(downvoteRecipeFailure({
        errors: {
          status: error.response.status,
          message: error.response.data.message
        }
      }));
      callback(false);
    });
};
