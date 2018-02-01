import recipes from '../controller/recipes';
import auth from '../middleware/authorization';
import { recipeValidator, validateParams } from '../middleware/validateInput';

/**
 * @description recipes routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
const recipeRoutes = (router) => {
  router.post('/recipes', auth.authorize, recipeValidator, recipes.addRecipe);
  router.get('/recipes', recipes.getAllRecipes);
  router.get('/myrecipes', auth.authorize, recipes.getUserRecipes);
  router.get('/recipes/:recipeId', recipes.getOneRecipe);
  router.put(
    '/recipes/:id',
    auth.authorize,
    validateParams,
    recipes.updateUserRecipes
  );
  router.delete('/recipes/:id', auth.authorize, recipes.deleteUserRecipes);
  router.post(
    '/search',
    auth.authorize,
    recipes.searchByRecipeNameOrIngredient
  );
};

export default recipeRoutes;
