// import controllers
import usersRoutes from './users';
import recipeRoutes from './recipes';
import reviewRoutes from './reviews';
import favoriteRoutes from './favorites';
import voteRoutes from './votes';

/**
 * @description combine user, recipe, voting reviews and favourite routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
const routes = (router) => {
  favoriteRoutes(router);
  usersRoutes(router);
  recipeRoutes(router);
  reviewRoutes(router);
  voteRoutes(router);
};

export default routes;
