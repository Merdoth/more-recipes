'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reviews = require('../controller/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reviewRoutes = function reviewRoutes(router) {
  router.post('/reviews/', _reviews2.default.add);
};

exports.default = reviewRoutes;