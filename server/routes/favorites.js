import favorite from '../controller/favorites';

const favoriteRoutes = (router) => {
  router.post('/favorites/', favorite.makeFavorite);
  router.get('users/:id/recipes', favorite.getFavorites);
};

export default favoriteRoutes;
