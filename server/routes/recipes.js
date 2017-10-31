import recipes from '../controller/recipes';
import auth from '../middleware/authorization';

const recipeRoutes = (router) => {
  router.post('/recipes/', auth.authorize, recipes.add);
  router.get('/recipes/', recipes.get);
  router.put('/recipes/:id', auth.authorize, recipes.update);
  router.delete('/recipes/:id', auth.authorize, recipes.delete);
};

export default recipeRoutes;
