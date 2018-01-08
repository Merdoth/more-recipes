import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import * as types from './../actionTypes';

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {void}
 */
export function setCurrentUser(user) {
  return {
    type: types.USER_AUTHENTICATED,
    user
  };
}

/**
 *
 * @desc this function returns a jwt token
 * @param {any} token
 * @returns {void}
 */
function decode(token) {
  return jwtDecode(token);
}

/**
 *
 *
 * @desc this function signs in a user
 * @param {any} responseData
 * @returns {void}
 */
export function login(responseData) {
  return dispatch =>
    axios.post('/api/v1/users/signin', responseData).then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(decode(token)));
    });
}
/**
 *
 *
 * @desc this method signs up a user
 * @param {any} userData
 * @returns {void}
 */
export function userSignupRequest(userData) {
  return dispatch =>
    axios.post('/api/v1/user/signup', userData).then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(decode(token)));
    });
}

/**
 *
 *
 * @desc this method logs out a user
 * @returns {void}
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentGroup');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}
