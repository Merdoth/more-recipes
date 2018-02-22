import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import * as types from './../actionTypes';

/**
 *
 * @param { Object } user
 *
 * @returns { undefined }
 */
export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

/**
 *
 * @description this function returns a jwt token
 *
 * @param { Object } token
 *
 * @returns { undefined }
 */
function decode(token) {
  return jwtDecode(token);
}

/**
 *
 * @description this function signs in a user
 *
 * @param { Object } resData
 *
 * @returns { undefined }
 */
export function login(resData) {
  return dispatch =>
    axios.post('/api/v1/users/signin', resData).then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(decode(token)));
    });
}
/**
 *
 *
 * @description this function signs up a user
 *
 * @param { Object } userData
 *
 * @returns { undefined }
 */
export function userSignupRequest(userData) {
  return dispatch =>
    axios.post('/api/v1/users/signup', userData).then((res) => {
      const { token } = res.data.user;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(decode(token)));
    });
}

/**
 *
 * @description this function logs out a user
 *
 * @returns { undefined }
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}
