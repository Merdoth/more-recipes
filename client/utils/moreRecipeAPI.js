import axios from 'axios';

export const getOneUser = () => axios.get('/api/v1/users/:id');

export const getAllRecipes = () => axios.get('');

export const userSignupRequest = () => axios.post('/api/v1/users/signup');

export const userSigninRequest = () => axios.post('/api/v1/users/signin');

export const getTopRecipes = () =>
  axios.get('/api/v1/recipes?sort=upvotes&order=des');
