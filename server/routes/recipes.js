import recipes from '../controller/recipes';
import auth from '../middleware/authorization';
import recipeValidator from '../middleware/recipeValidator';

const recipeRoutes = (router) => {
  router.post('/recipes', auth.authorize, recipeValidator, recipes.addRecipe);
  router.get('/recipes', recipes.getAllRecipes);
  router.get('/recipes/:userId', recipes.getUserRecipes);
  router.get('/recipe/:recipeId', recipes.getOneRecipe);
  router.put('/recipe/:id', auth.authorize, recipes.updateUserRecipes);
  router.delete('/recipes/:id', auth.authorize, recipes.deleteUserRecipes);
  router.post('/search', auth.authorize, recipes.searchRecipes);
};

export default recipeRoutes;
