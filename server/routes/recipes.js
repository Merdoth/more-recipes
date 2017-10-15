import recipes from '../controller/recipes';

const recipeRoutes = (router) => {
  router.post('/recipes/', recipes.add);
  router.get('/recipes/', recipes.get);
  router.put('/recipes/:id', recipes.update);
  router.delete('/recipes/:id', recipes.delete);
};

export default recipeRoutes;
