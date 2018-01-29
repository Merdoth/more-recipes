import swal from 'sweetalert';
import * as types from '../actionTypes';
import * as api from './../../utils/moreRecipeAPI';

/**
 * @method
 *
 * @param {object} review
 *
 * @returns {Object} payload
 *
 */
export const addReviewSuccess = review => ({
  type: types.POST_REVIEW_SUCCESS,
  review
});

/**
 * @method
 *
 * @param {object} error
 *
 * @returns {undefined}
 *
 */
export const addReviewFailure = error => ({
  type: types.POST_REVIEW_FAILURE,
  error
});

/**
 * @description this dispatches an action that adds a review to a recipe
 *
 * @method
 *
 * @param {Integer} recipeId
 *
 * @param {object} review
 *
 * @returns {Object} payload
 *
 */
export const addReview = (recipeId, review) => dispatch =>
  api
    .addReview(recipeId, review)
    .then((res) => {
      const { reviewReturned } = res.data;
      dispatch(addReviewSuccess(reviewReturned));
      swal({
        title: 'review successfully added!',
        text: res.data.message,
        icon: 'success'
      });
    })
    .catch((err) => {
      dispatch(addReviewFailure(err));
    });

/**
 * @method
 *
 * @param {Object} recipe
 *
 * @param {object} review
 *
 * @returns {Object} payload
 *
 */

export const getReviewSuccess = (recipe, review) => ({
  type: types.GET_REVIEW_SUCCESS,
  recipe,
  review
});

/**
 * @method
 *
 * @param {object} error
 *
 * @returns {Object} payload
 *
 */
export const getReviewFailure = error => ({
  type: types.GET_REVIEW_FAILURE,
  error
});

/**
 * @description this dispatches an action that gets a review to a recipe
 *
 * @method
 *
 * @param {Integer} recipeId
 *
 * @param {object} review
 *
 * @returns {Object} payload
 *
 */
export const getReview = () => dispatch =>
  api.getReview().then((res) => {
    const recipe = res.data;
    dispatch(getReviewSuccess(recipe));
  });
