import favorite from '../controller/favorites';

const favoriteRoutes = (router) => {
  router.post('/favorites/', favorite.makeFavorite);
  router.get('/favorites/', favorite.getFavorites);
};

export default favoriteRoutes;