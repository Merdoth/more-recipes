import reviews from '../controller/reviews';
import { reviewsValidator, validateParams } from '../middleware/validateInput';
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
    reviewsValidator,
    validateParams,
    reviews.addReview
  );
};

export default reviewRoutes;
