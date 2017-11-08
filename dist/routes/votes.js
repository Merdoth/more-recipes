'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _votes = require('../controller/votes');

var _votes2 = _interopRequireDefault(_votes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voteRoutes = function voteRoutes(router) {
  router.post('/votes', _votes2.default.upVotes);
  router.get('/votes', _votes2.default.getAllUpvoted);
};

exports.default = voteRoutes;