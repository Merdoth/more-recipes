import reviews from '../controller/reviews';

const reviewRoutes = (router) => {
  router.post('recipes/:id/reviews', reviews.add);
};

export default reviewRoutes;