import axios from 'axios';

/**
 *
 * @description this method sets authetication for a signed up or signed in user
 *
 * @param { object } token
 *
 * @returns { Object } json - payload
 */
const setAuthToken = (token) => {
  token = token || localStorage.getItem('jwtToken');
  if (token) {
    axios.defaults.headers.common.Authorization = `${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
  return axios;
};
export default setAuthToken;
