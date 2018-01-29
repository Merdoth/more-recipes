import reviews from '../controller/reviews';
import reviewsValidator from '../middleware/reviewsValidator';
import auth from '../middleware/authorization';

const reviewRoutes = (router) => {
  router.post('/recipes/:recipeId/reviews', reviewsValidator, auth.authorize, reviews.addReview);
};

export default reviewRoutes;
