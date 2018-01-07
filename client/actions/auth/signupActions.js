import * as types from '../actionTypes';
import * as api from './../../utils/moreRecipeAPI';

export const userSignupRequestSuccess = userData => ({
  type: types.USER_SIGNUP,
  userData
});

export const userSignupRequest = () => (dispatch) => {
  api.userSignupRequest().then((res) => {
    dispatch(userSignupRequestSuccess(res.userData));
  });
};
