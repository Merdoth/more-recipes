import * as types from '../actions/actionTypes';

export const initialState = {
  favourite: [],
  message: '',
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_FAVOURITE_SUCCESS:
      return {
        ...state,
        favourite: action.favourite
      };
    case types.GET_FAVOURITE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.ADD_FAVOURITE_SUCCESS:
      return {
        ...state,
        favourite: [action.favourite]
      };
    case types.REMOVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        favourite: action.favourite
      };
    case types.ADD_FAVOURITE_FAILURE:
    case types.REMOVE_FAVOURITE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
