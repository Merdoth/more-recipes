import axios from 'axios';

// Sets the authorization header
const header = () => ({
  headers: {
    authorization: window.localStorage.jwtToken
  }
});

/**
 *
 * @description get a specific user
 *
 * @param {Object} object
 *
 * @returns {void}
 *
 */
export const getOneUser = () => axios.get('/api/v1/users/:id');

/**
 *
 * @description gets all recipes
 *
 * @param {Object} object
 *
 * @returns {void}
 *
 */
export const getAllRecipes = () => axios.get('/api/v1/recipes');

/**
 *
 * @description user signup request allows a new user signup.
 *
 * @param {Object} object
 *
 * @returns {void}
 *
 */
export const userSignupRequest = () => axios.post('/api/v1/users/signup');

/**
 *
 * @description user signin request allows a user signin into his or her account.
 *
 * @param {Object} object
 *
 * @returns {void}
 *
 */
export const userSigninRequest = () => axios.post('/api/v1/users/signin');

/**
 *
 * @description allows a user add new recipes to their recipe list.
 *
 * @param {Object} recipes
 *
 * @returns {void}
 *
 */
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

/**
 *
 * @description allows a user update an already existing recipe.
 *
 * @param {Object} id
 *
 * @param {Object} recipes
 *
 * @returns {void}
 *
 */
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
    return axios.put(`/api/v1/recipe/${id}`, recipeData, header());
  });
};
/**
 *
 * @description post user review.
 *
 * @param {Object} recipeId
 *
 * @param {Object} review
 *
 * @returns {void}
 *
 */
export const addReview = (recipeId, review) =>
  axios.post(`/api/v1/recipes/${recipeId}/reviews`, { review });

/**
 *
 * @description allows a user get all top recipes
 *
 * @param {Object} object
 *
 * @returns {void}
 *
 */
export const getTopRecipes = () =>
  axios.get('/api/v1/recipes?sort=upvotes&order=des');

/**
 *
 * @description allows a user get .
 *
 * @param {Object} recipeId
 *
 * @returns {void}
 *
 */
export const getOneRecipe = recipeId => axios.get(`/api/v1/recipe/${recipeId}`);

/**
 *
 * @description allows a user delete his/her recipes
 *
 * @param {Object} id - action object
 *
 * @returns {void}
 *
 */
export const deleteRecipe = id => axios.delete(`/api/v1/recipes/${id}`);
