'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _favorites = require('../controller/favorites');

var _favorites2 = _interopRequireDefault(_favorites);

var _authorization = require('../middleware/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

var _favoriteValidator = require('../middleware/favoriteValidator');

var _favoriteValidator2 = _interopRequireDefault(_favoriteValidator);

var _validateInput = require('../middleware/validateInput');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description favourite routes
 *
 * @param {Function} router
 *
 * @returns { undefined }
 */
// import module, controllers and middlewares
var favoriteRoutes = function favoriteRoutes(router) {
  router.post('/favorites', _authorization2.default.authorize, _validateInput.validateParams, _favoriteValidator2.default, _favorites2.default.addFavorite);
  router.get('/users/:id/recipes', _authorization2.default.authorize, _favorites2.default.getFavorites);
};

exports.default = favoriteRoutes;