import usersRoutes from './users';
import recipeRoutes from './recipes';
import reviewRoutes from './reviews';
import favoriteRoutes from './favorites';
import voteRoutes from './votes';

const routes = (router) => {
  favoriteRoutes(router);
  usersRoutes(router);
  recipeRoutes(router);
  reviewRoutes(router);
  voteRoutes(router);
};

export default routes;
