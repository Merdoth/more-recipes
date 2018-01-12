import * as types from '../actionTypes';
import * as api from './../../utils/moreRecipeAPI';

export const userSigninRequestSuccess = userData => ({
  type: types.USER_SIGNIN,
  userData
});
export const userSigninRequest = () => (dispatch) => {
  api.userSigninRequest().then((res) => {
    dispatch(userSigninRequestSuccess(res.userData));
  });
};
