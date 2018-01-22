import axios from 'axios';

const header = () => ({
  headers: {
    authorization: window.localStorage.jwtToken
  }
});

export const getOneUser = () => axios.get('/api/v1/users/:id');

export const getAllRecipes = () => axios.get('/api/v1/recipes');

export const userSignupRequest = () => axios.post('/api/v1/users/signup');

export const userSigninRequest = () => axios.post('/api/v1/users/signin');

export const addRecipeRequest = (recipes) => {
  delete axios.defaults.headers.common.Authorization;
  const formData = new FormData();
  formData.append('file', recipes.image);
  formData.append('upload_preset', 'v1papr5k');
  return axios({
    method: 'POST',
    url: 'https://api.cloudinary.com/v1_1/ucheya/image/upload',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  }).then((res) => {
    const { recipeName, ingredients, preparation } = recipes;
    const recipeData = {
      recipeName,
      ingredients,
      preparation,
      image: res.data.url
    };
    return axios.post('/api/v1/recipes', recipeData, header());
  });
};

export const updateRecipeRequest = (id, recipes) => {
  delete axios.defaults.headers.common.Authorization;
  const formData = new FormData();
  formData.append('file', recipes.image);
  formData.append('upload_preset', 'v1papr5k');
  return axios({
    method: 'POST',
    url: 'https://api.cloudinary.com/v1_1/ucheya/image/upload',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  }).then((res) => {
    const { recipeName, ingredients, preparation } = recipes;
    const recipeData = {
      recipeName,
      ingredients,
      preparation,
      image: res.data.url
    };
    return axios.put(`/api/v1/recipes/${id}`, recipeData, header());
  });
};

export const getTopRecipes = () =>
  axios.get('/api/v1/recipes?sort=upvotes&order=des');

export const getOneRecipe = recipeId => axios.get(`/api/v1/recipe/${recipeId}`);
