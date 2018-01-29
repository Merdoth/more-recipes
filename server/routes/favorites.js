// import module, controllers and middlewares
import favorite from '../controller/favorites';
import auth from '../middleware/authorization';
import alreadyFavorited from '../middleware/favoriteValidator';
import { validateParams } from '../middleware/validateInput';

/**
 * @description favourite routes
 *
 * @param {Function} router
 *
 * @returns { undefined }
 */
const favoriteRoutes = (router) => {
  router.post(
    '/favorites',
    auth.authorize,
    validateParams,
    alreadyFavorited,
    favorite.addFavorite
  );
  router.get('/users/:id/recipes', auth.authorize, favorite.getFavorites);
};

export default favoriteRoutes;
