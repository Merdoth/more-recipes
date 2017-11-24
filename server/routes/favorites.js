import favorite from '../controller/favorites';
import auth from '../middleware/authorization';
import alreadyFavorited from '../middleware/favoriteValidator';

const favoriteRoutes = (router) => {
  router.post('/favorites', auth.authorize, alreadyFavorited, favorite.addFavorite);
  router.get('users/:id/recipes', auth.authorize, favorite.getFavorites);
};

export default favoriteRoutes;
