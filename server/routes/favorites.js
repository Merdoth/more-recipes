import favorite from '../controller/favorites';
import auth from '../middleware/authorization';

/**
 * @description favourite routes
 *
 * @param {Function} router
 *
 * @returns { undefined }
 */
const favoriteRoutes = (router) => {
  router.post('/favourites', auth.authorize, favorite.addFavourites);
  router.delete('/favourites/:recipeId', auth.authorize, favorite.removeFavourites);
  router.get(
    '/favourites/:recipeId',
    auth.authorize,
    favorite.getSingleFavourite
  );
  router.get(
    '/users/:recipeId/removeFavourites',
    auth.authorize,
    favorite.getFavorites
  );
};

export default favoriteRoutes;
