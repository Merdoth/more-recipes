'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _favorites = require('../controller/favorites');

var _favorites2 = _interopRequireDefault(_favorites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var favoriteRoutes = function favoriteRoutes(router) {
  router.post('/favorites/', _favorites2.default.makeFavorite);
  router.get('/favorites/', _favorites2.default.getFavorites);
};

exports.default = favoriteRoutes;