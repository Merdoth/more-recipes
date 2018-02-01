'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recipes = require('../controller/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _authorization = require('../middleware/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

var _validateInput = require('../middleware/validateInput');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description recipes routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
var recipeRoutes = function recipeRoutes(router) {
  router.post('/recipes', _authorization2.default.authorize, _validateInput.recipeValidator, _recipes2.default.addRecipe);
  router.get('/recipes', _recipes2.default.getAllRecipes);
  router.get('/recipes/:userId', _recipes2.default.getUserRecipes);
  router.get('/recipe/:recipeId', _recipes2.default.getOneRecipe);
  router.put('/recipe/:id', _authorization2.default.authorize, _validateInput.validateParams, _recipes2.default.updateUserRecipes);
  router.delete('/recipes/:id', _authorization2.default.authorize, _recipes2.default.deleteUserRecipes);
  router.post('/search', _authorization2.default.authorize, _recipes2.default.searchByRecipeNameOrIngredient);
};

exports.default = recipeRoutes;