import axios from 'axios';

export const getOneUser = () => axios.get('/api/v1/users/:id');

export const getAllRecipes = () => axios.get('');
