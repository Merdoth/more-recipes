import reviews from '../controller/reviews';
import reviewsValidator from '../middleware/reviewsValidator';

const reviewRoutes = (router) => {
  router.post('/recipes/:id/reviews', reviewsValidator, reviews.addReview);
};

export default reviewRoutes;
