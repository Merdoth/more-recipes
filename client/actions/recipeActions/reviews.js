import swal from 'sweetalert';
import * as types from '../actionTypes';
import * as api from './../../utils/moreRecipeAPI';

/**
 * @param { Object } review
 *
 * @returns { Object } json - payload
 *
 */
export const addReviewSuccess = review => ({
  type: types.POST_REVIEW_SUCCESS,
  review: review.reviewReturned
});

/**
 * @param { Object } error
 *
* @returns { Object } json - payload
 *
 */
export const addReviewFailure = error => ({
  type: types.POST_REVIEW_FAILURE,
  error
});

/**
 * @description this dispatches an action that adds a review to a recipe
 *
 * @param { Number } recipeId
 *
 * @param { Object } review
 *
 * @returns { Object } payload
 *
 */
export const addReview = (recipeId, review) => dispatch =>
  api
    .addReview(recipeId, review)
    .then((res) => {
      dispatch(addReviewSuccess(res.data));
      swal({
        title: 'review successfully added!',
        text: res.data.message,
        icon: 'success'
      });
    })
    .catch((err) => {
      dispatch(addReviewFailure(err));
    });
