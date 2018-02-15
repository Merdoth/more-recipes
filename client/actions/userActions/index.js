import * as types from '../actionTypes';
import * as api from './../../utils/moreRecipeAPI';

export const getOneUserSuccess = user => ({
  type: types.GET_ONE_USER_SUCCESS,
  user
});

export const getOneUserFailure = error => ({
  type: types.GET_ONE_USER_FAILURE,
  error
});

export const getOneUser = () => (dispatch) => {
  api.getOneUser().then((res) => {
    dispatch(getOneUserSuccess(res.data));
  })
    .catch((error) => {
      dispatch(getOneUserFailure(error));
    });
};

export const updateUserProfileSuccess = user => ({
  type: types.UPDATE_USER_PROFILE_SUCCESS,
  user
});

export const updateUserProfileFailure = error => ({
  type: types.UPDATE_USER_PROFILE_FAILURE,
  error
});


export const updateUserProfile = userData => (dispatch) => {
  api.updateUserProfile(userData).then((res) => {
    dispatch(updateUserProfileSuccess(res.data));
  })
    .catch((error) => {
      dispatch(updateUserProfileFailure(error));
    });
};
