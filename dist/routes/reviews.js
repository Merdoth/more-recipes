'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reviews = require('../controller/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _reviewsValidator = require('../middleware/reviewsValidator');

var _reviewsValidator2 = _interopRequireDefault(_reviewsValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reviewRoutes = function reviewRoutes(router) {
  router.post('/recipes/:id/reviews', _reviewsValidator2.default, _reviews2.default.addReview);
};

exports.default = reviewRoutes;