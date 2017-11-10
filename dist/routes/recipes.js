'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recipes = require('../controller/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _authorization = require('../middleware/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recipeRoutes = function recipeRoutes(router) {
  router.post('/recipes/', _authorization2.default.authorize, _recipes2.default.add);
  router.get('/recipes/', _recipes2.default.get);
  router.put('/recipes/:id', _authorization2.default.authorize, _recipes2.default.update);
  router.delete('/recipes/:id', _authorization2.default.authorize, _recipes2.default.delete);
};

exports.default = recipeRoutes;