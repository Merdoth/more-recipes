import * as types from '../actions/actionTypes';

const initialState = {
  review: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.POST_REVIEW_SUCCESS:
      return {
        ...state,
        ...action.review
      };
    
    case types.GET_ALL_RECIPES:
      return {
        ...state,
        ...action.recipes
      };

    default:
      return state;
  }
};
