'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reviews = require('../controller/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _validateInput = require('../middleware/validateInput');

var _authorization = require('../middleware/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description reviews routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
var reviewRoutes = function reviewRoutes(router) {
  router.post('/recipes/:recipeId/reviews', _authorization2.default.authorize, _validateInput.reviewsValidator, _validateInput.validateParams, _reviews2.default.addReview);
};

exports.default = reviewRoutes;