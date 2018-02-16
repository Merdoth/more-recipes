import Recipes from '../controller /Recipes';
import auth from '../middleware/authorization';

/**
 * @description recipes routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const recipeRoutes = (router) => {
  router.post('/recipes', auth.authorize, Recipes.addRecipe);
  router.get('/recipes', Recipes.getAllRecipes);
  router.get('/myrecipes', auth.authorize, Recipes.getUserRecipes);
  router.get('/user/:userId/recipes/:recipeId', Recipes.getOneRecipe);
  router.put('/recipes/:id', auth.authorize, Recipes.updateUserRecipes);
  router.delete('/recipes/:id', auth.authorize, Recipes.deleteUserRecipes);
  router.post(
    '/search',
    auth.authorize,
    Recipes.searchRecipe
  );
};

export default recipeRoutes;
