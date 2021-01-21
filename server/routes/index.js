// import controllers
import usersRoutes from './usersRoutes';
import recipeRoutes from './recipeRoutes';
import reviewRoutes from './reviewRoutes';
import favoriteRoutes from './favoriteRoutes';
import voteRoutes from './voteRoutes';

/**
 * @description combines user, recipe, voting, reviews and favourite routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const routes = (router) => {
  usersRoutes(router);
  recipeRoutes(router);
  favoriteRoutes(router);
  reviewRoutes(router);
  voteRoutes(router);
};

export default routes;
