import * as types from './types';
import * as api from '../utils/moreRecipeAPI';

export const getOneUserSuccess = user => ({
  type: types.GET_ONE_USER,
  user
});

export const getOneUser = () => (dispatch) => {
  api.getOneUser().then((res) => {
    dispatch(getOneUserSuccess(res.data));
  });
};
