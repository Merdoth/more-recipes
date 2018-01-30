'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _recipes = require('./recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _reviews = require('./reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _favorites = require('./favorites');

var _favorites2 = _interopRequireDefault(_favorites);

var _votes = require('./votes');

var _votes2 = _interopRequireDefault(_votes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description combine user, recipe, voting reviews and favourite routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
var routes = function routes(router) {
  (0, _favorites2.default)(router);
  (0, _users2.default)(router);
  (0, _recipes2.default)(router);
  (0, _reviews2.default)(router);
  (0, _votes2.default)(router);
}; // import controllers
exports.default = routes;