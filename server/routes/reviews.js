import reviews from '../controller/reviews';
import auth from '../middleware/authorization';

/**
 * @description reviews routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
const reviewRoutes = (router) => {
  router.post(
    '/recipes/:recipeId/reviews',
    auth.authorize,
    reviews.addReview
  );
};

export default reviewRoutes;
