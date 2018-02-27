import swal from 'sweetalert';
import * as types from '../actionTypes';
import * as api from './../../utils/moreRecipeAPI';

/**
 *
 * @param { Object } user
 *
 * @returns { undefined }
 *
 */
export const getOneUserSuccess = user => ({
  type: types.GET_ONE_USER_SUCCESS,
  user
});

/**
 *
 * @param { Object } error
 *
 * @returns { undefined }
 *
 */
export const getOneUserFailure = error => ({
  type: types.GET_ONE_USER_FAILURE,
  error
});

/**
 *
 * @description dispatches an action to get a user
 *
 * @returns { Object } payload
 *
 */

export const getOneUser = () => (dispatch) => {
  api.getOneUser().then((res) => {
    dispatch(getOneUserSuccess(res.data));
  })
    .catch((error) => {
      dispatch(getOneUserFailure(error.response.data));
    });
};

/**
 *
 * @param { Object } user
 *
 * @returns { undefined }
 *
 */
export const updateUserProfileSuccess = user => ({
  type: types.UPDATE_USER_PROFILE_SUCCESS,
  user
});

/**
 *
 * @param { Object } error
 *
 * @returns { undefined }
 *
 */
export const updateUserProfileFailure = error => ({
  type: types.UPDATE_USER_PROFILE_FAILURE,
  error
});


/**
 *
 * @description dispatches an action to update a user profile
 *
 * @param { Object } userData
 *
 * @returns { Object } payload
 *
 */

export const updateUserProfile = userData => (dispatch) => {
  api.updateUserProfile(userData).then((res) => {
    dispatch(updateUserProfileSuccess(res.data));
    swal('Great!!!', 'Your profile has been updated successfully', 'success');
  })
    .catch((error) => {
      dispatch(updateUserProfileFailure(error));
    });
};
