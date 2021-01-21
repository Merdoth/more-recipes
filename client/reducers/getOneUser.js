import * as types from '../actions/actionTypes';

export const initialState = {
  users: {},
  error: {}
};

const getOneUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_ONE_USER_SUCCESS:
      return {
        users: action.user
      };
    case types.GET_ONE_USER_FAILURE:
      return {
        error: action.error
      };
    case types.UPDATE_USER_PROFILE_SUCCESS:
      return {
        users: action.user
      };
    case types.UPDATE_USER_PROFILE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
};
export default getOneUser;

