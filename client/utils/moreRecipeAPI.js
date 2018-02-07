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
 * @returns {undefined}
 *
 */
export const getOneUser = () => axios.get('/api/v1/users/:id');

/**
 *
 * @description get a specific users recipes
 *
 * @param {Object} object
 *
 * @returns {undefined}
 *
 */
export const getUserRecipes = () => axios.get('/api/v1/myrecipes');

/**
 *
 * @description gets all recipes
 *
 * @param {Object} object
 *
 * @returns {undefined}
 *
 */
export const getAllRecipes = () => axios.get('/api/v1/recipes');

/**
 *
 * @description user signup request allows a new user signup.
 *
 * @param {Object} object
 *
 * @returns {undefined}
 *
 */
export const userSignupRequest = () => axios.post('/api/v1/users/signup');

/**
 *
 * @description user signin request allows a user signin into his or her account.
 *
 * @param {Object} object
 *
 * @returns {undefined}
 *
 */
export const userSigninRequest = () => axios.post('/api/v1/users/signin');

/**
 *
 * @description allows a user add new recipes to their recipe list.
 *
 * @param {Object} recipes
 *
 * @returns {undefined}
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
 * @param {Object} recipes
 *
 * @returns {undefined}
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
    return axios.put(`/api/v1/recipes/${id}`, recipeData, header());
  });
};
/**
 *
 * @description post user review.
 *
 * @param {Object} recipeId
 * @param {Object} review
 *
 * @returns {undefined}
 *
 */
export const addReview = (recipeId, review) =>
  axios.post(`/api/v1/recipes/${recipeId}/reviews`, { review });

/**
 *
 * @description upvote user recipe.
 *
 * @param {Object} id
 * @param {Object} callback
 *
 * @returns {undefined}
 *
 */
export const upVoteRecipe = (id, callback) =>
  axios.post(`/api/v1/recipes/${id}/votes`, { callback });

/**
 *
 * @description allows a user get all top recipes
 *
 * @param {Object} object
 *
 * @returns {undefined}
 *
 */
export const getMostVotedRequest = () =>
  axios.get('/api/v1/recipes?sort=upvotes&order=des');

/**
 *
 * @description allows a user get .
 * @param {Object} userId
 * @param {Object} recipeId
 *
 * @returns {undefined}
 *
 */
export const getOneRecipe = (userId, recipeId) =>
  axios.get(`/api/v1/user/${userId}/recipes/${recipeId}`);

/**
 *
 * @description allows a user delete his/her recipes
 *
 * @param {Object} id - action object
 *
 * @returns {undefined}
 *
 */
export const deleteRecipe = id =>
  axios({
    method: 'DELETE',
    url: `/api/v1/recipes/${id}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

export const removeFavouriteRequest = recipeId =>
  axios({
    method: 'DELETE',
    url: `/api/v1/favourites/${recipeId} `,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

export const addFavouriteRequest = recipeId =>
  axios.post('/api/v1/favourites', { recipeId });
export const getFavouriteRequest = recipeId =>
  axios.get(`/api/v1/favourites/${recipeId}`);
