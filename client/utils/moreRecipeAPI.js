import axios from 'axios';

const header = () => ({
  headers: {
    authorization: window.localStorage.jwtToken
  }
});

export const getOneUser = () => axios.get('/api/v1/users/:id');

export const getAllRecipes = () => axios.get('');

export const userSignupRequest = () => axios.post('/api/v1/users/signup');

export const userSigninRequest = () => axios.post('/api/v1/users/signin');

export const addRecipeRequest = (data) => {
  delete axios.defaults.headers.common.Authorization;
  const formData = new FormData();
  formData.append('file', data.image);
  formData.append('upload_preset', 'v1papr5k');
  return axios({
    method: 'POST',
    url: 'https://api.cloudinary.com/v1_1/ucheya/image/upload',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  }).then((res) => {
    const { recipeName, ingredients, preparation } = data;
    const recipeData = {
      recipeName,
      ingredients,
      preparation,
      image: res.data.url
    };
    return axios.post('/api/v1/recipes', recipeData, header());
  });
};

export const getTopRecipes = () =>
  axios.get('/api/v1/recipes?sort=upvotes&order=des');
