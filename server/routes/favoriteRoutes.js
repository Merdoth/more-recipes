import Favorites from '../controller /Favorites';
import auth from '../middleware/authorization';

/**
 * @description recipe favourites routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const favoriteRoutes = (router) => {
  router.post('/favourites', auth.authorize, Favorites.addFavourites);
  router.delete(
    '/favourites/:recipeId',
    auth.authorize,
    Favorites.removeFavourites
  );
  router.get(
    '/favourites/:userId',
    auth.authorize,
    Favorites.getUserFavourites
  );
};

export default favoriteRoutes;
