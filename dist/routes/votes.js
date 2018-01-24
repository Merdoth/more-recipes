'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _votes = require('../controller/votes');

var _votes2 = _interopRequireDefault(_votes);

var _votesValidator = require('../middleware/votesValidator');

var _votesValidator2 = _interopRequireDefault(_votesValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voteRoutes = function voteRoutes(router) {
  router.post('/votes', _votesValidator2.default, _votes2.default.upVotes);
  router.get('/recipes?sort=upvotes&order=desc', _votes2.default.getAllUpvoted);
};

exports.default = voteRoutes;