import * as types from '../actions/actionTypes';

const initialState = {
  recipes: [],
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_MOST_VOTED_SUCCESS:
      return {
        ...state,
        ...action.recipes
      };

    case types.GET_MOST_VOTED_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case types.GET_ALL_RECIPES:
      return {
        ...state,
        ...action.recipes
      };

    case types.GET_USER_RECIPES_SUCCESS:
      return {
        ...state,
        ...action.recipes
      };

    case types.GET_USER_RECIPES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
