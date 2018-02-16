import Reviews from '../controller /Reviews';
import auth from '../middleware/authorization';

/**
 * @description recipes review routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const reviewRoutes = (router) => {
  router.post('/recipes/:recipeId/reviews', auth.authorize, Reviews.addReview);
  router.get('/recipes/:recipeId/reviews', auth.authorize, Reviews.getReview);
};

export default reviewRoutes;
