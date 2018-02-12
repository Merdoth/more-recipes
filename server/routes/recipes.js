import recipes from '../controller/recipes';
import auth from '../middleware/authorization';

/**
 * @description recipes routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
const recipeRoutes = (router) => {
  router.post('/recipes', auth.authorize, recipes.addRecipe);
  router.get('/recipes', recipes.getAllRecipes);
  router.get('/myrecipes', auth.authorize, recipes.getUserRecipes);
  router.get('/user/:userId/recipes/:recipeId', recipes.getOneRecipe);
  router.put('/recipes/:id', auth.authorize, recipes.updateUserRecipes);
  router.delete('/recipes/:id', auth.authorize, recipes.deleteUserRecipes);
  router.post(
    '/search',
    auth.authorize,
    recipes.searchRecipe
  );
};

export default recipeRoutes;
