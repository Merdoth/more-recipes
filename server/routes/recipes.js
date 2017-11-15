import recipes from '../controller/recipes';
import auth from '../middleware/authorization';
import recipeValidator from '../middleware/recipeValidator';

const recipeRoutes = (router) => {
  router.post('/recipes/', auth.authorize, recipeValidator, recipes.add);
  router.get('/recipes/', recipes.get);
  router.get('/recipes/userId', recipes.getMine);
  router.put('/recipes/:id', auth.authorize, recipes.update);
  router.delete('/recipes/:id', auth.authorize, recipes.delete);
};

export default recipeRoutes;
