import axios from 'axios';

/**
 *
 * @description Sets the authorization header
 *
 * @returns { undefined }
 *
 */
const header = () => ({
  headers: {
    authorization: window.localStorage.jwtToken
  }
});

/**
 *
 * @description get a specific user
 *
 * @returns { undefined }
 *
 */
export const getOneUser = () => axios.get('/api/v1/user');

/**
 *
 * @description update a specific user profile
 *
 * @param { Object } userData
 *
 * @returns { undefined }
 *
 */
export const updateUserProfile = userData =>
  axios.put('/api/v1/update', userData);

/**
 *
 * @description get a specific users recipes
 *
 * @param { Number } page
 * @param { Number } offset
 * @param { Number } limit
 *
 * @returns { undefined }
 *
 */
export const getUserRecipes = (page, offset, limit) =>
  axios.get(`/api/v1/myrecipes?page=${page}&offset=${offset}&limit=${limit}`);

/**
 *
 * @description gets all recipes
 *
 * @param { Number } page
 * @param { Number } offset
 * @param { Number } limit
 *
 * @returns { undefined }
 *
 */
export const getAllRecipes = (page, offset, limit) =>
  axios.get(`/api/v1/recipes?page=${page}&offset=${offset}&limit=${limit}`);

/**
 *
 * @description signs up a user.
 *
 * @returns { undefined }
 *
 */
export const userSignupRequest = () => axios.post('/api/v1/users/signup');

/**
 *
 * @description signs in a user.
 *
 * @returns { undefined }
 *
 */
export const userSigninRequest = () => axios.post('/api/v1/users/signin');

/**
 *
 * @description adds a recipe to the recipe list.
 *
 * @param { Object } recipes
 *
 * @returns { undefined }
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
    const {
      recipeName, description, ingredients, preparation
    } = recipes;
    const recipeData = {
      recipeName,
      description,
      ingredients,
      preparation,
      image: res.data.url
    };
    return axios.post('/api/v1/recipes', recipeData, header());
  });
};

/**
 *
 * @description updates a recipe.
 *
 * @param { Number } id
 *
 * @param { Object } recipes
 *
 * @returns { undefined }
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
    const {
      recipeName, description, ingredients, preparation
    } = recipes;
    const recipeData = {
      recipeName,
      description,
      ingredients,
      preparation,
      image: res.data.url
    };
    return axios.put(`/api/v1/recipes/${id}`, recipeData, header());
  });
};
/**
 *
 * @description add review to recipe.
 *
 * @param { Number } recipeId
 *
 * @param { Object } review
 *
 * @returns { undefined }
 *
 */
export const addReview = (recipeId, review) =>
  axios.post(`/api/v1/recipes/${recipeId}/reviews`, { review });

/**
 *
 * @description upvote user recipe.
 *
 * @param { Number } id
 *
 * @param { Object } callback
 *
 * @returns { undefined }
 *
 */
export const upVoteRecipe = (id, callback) =>
  axios.post(`/api/v1/recipes/${id}/votes`, { callback });

/**
 *
 * @description allows a user get all top recipes
 *
 * @param { Object } object
 *
 * @returns { undefined }
 *
 */
export const getMostVotedRequest = () =>
  axios.get('/api/v1/recipes?sort=upvotes&order=des');

/**
 *
 * @description gets a specific recipe .
 *
 * @param { Number } userId
 * @param { Number } recipeId
 *
 * @returns { undefined }
 *
 */
export const getOneRecipe = (userId, recipeId) =>
  axios.get(`/api/v1/user/${userId}/recipes/${recipeId}`);

/**
 *
 * @description deletes a recipe
 *
 * @param { Number } id - action object
 *
 * @returns { undefined }
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


/**
 *
 * @description search for recipes
 *
 * @param { String } name
 *
 * @param { Number } limit
 * @param { Number } offset
 *
 * @returns { undefined }
 *
 */
export const searchRecipeApi = (name, limit, offset) =>
  axios.post(`api/v1/search?name=${name}&limit=${limit}&offset=${offset}`);


/**
 *
 * @description favourite recipes
 *
 * @param { Number } recipeId
 *
 * @returns { undefined }
 *
 */
export const addFavouriteRequest = recipeId =>
  axios.post('/api/v1/favourites', { recipeId });


export const getFavouriteRequest = recipeId =>
  axios.get(`/api/v1/favourites/${recipeId}`);
