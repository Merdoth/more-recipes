import * as types from '../actions/actionTypes';

export const initialState = {
  recipe: {
  },
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SEARCH_RECIPE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case types.SEARCH_RECIPE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
