import recipes from '../controller/recipes';
import auth from '../middleware/authorization';
import recipeValidator from '../middleware/recipeValidator';

const recipeRoutes = (router) => {
  router.post('/recipes', auth.authorize, recipeValidator, recipes.addRecipe);
  router.get('/recipes', recipes.getAllRecipes);
  router.get('/recipes/userId', recipes.getUserRecipes);
  router.put('/recipes/:id', auth.authorize, recipes.updateUserRecipes);
  router.delete('/recipes/:id', auth.authorize, recipes.deleteUserRecipes);
};

export default recipeRoutes;
