import usersRoutes from './users';
import recipeRoutes from './recipes';
import reviewRoutes from './reviews';
import favoriteRoutes from './favorites';

const routes = (router) => {
  usersRoutes(router);
  recipeRoutes(router);
  reviewRoutes(router);
  favoriteRoutes(router);
};

export default routes;
