import usersRoutes from './users';
import recipeRoutes from './recipes';
import reviewRoutes from './reviews';
import favoriteRoutes from './favorites';
import voteRoutes from './votes';

const routes = (router) => {
  usersRoutes(router);
  recipeRoutes(router);
  reviewRoutes(router);
  favoriteRoutes(router);
  voteRoutes(router);
};

export default routes;
