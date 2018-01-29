import swal from 'sweetalert';
import * as types from '../actionTypes';
import * as api from './../../utils/moreRecipeAPI';

export const addReviewSuccess = review => ({
  type: types.POST_REVIEW_SUCCESS,
  review
});

export const addReviewFailure = error => ({
  type: types.POST_REVIEW_FAILURE,
  error
});

export const postReview = (recipeId, review) => dispatch =>
  api
    .addReview(recipeId, review)
    .then((res) => {
      const { reviewReturned } = res.data;
      console.log(reviewReturned, 'response');
      dispatch(addReviewSuccess(reviewReturned));
      swal({
        title: 'review successfully added!',
        text: res.data.message,
        icon: 'success'
      });
    })
    .catch((err) => {
      console.log(err, 'this is a err');
      dispatch(addReviewFailure(err));
    });

export const getReviewSuccess = (recipe, review) => ({
  type: types.GET_REVIEW_SUCCESS,
  recipe,
  review
});

export const getReviewFailure = error => ({
  type: types.GET_REVIEW_FAILURE,
  error
});

export const getReview = () => dispatch =>
  api.getReview().then((res) => {
    const recipe = res.data;
    dispatch(getReviewSuccess(recipe));
  });
