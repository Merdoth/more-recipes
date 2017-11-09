import reviews from '../controller/reviews';

const reviewRoutes = (router) => {
  router.post('/reviews/', reviews.add);
};

export default reviewRoutes;