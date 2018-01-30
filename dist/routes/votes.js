'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _votes = require('../controller/votes');

var _votes2 = _interopRequireDefault(_votes);

var _authorization = require('../middleware/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

var _votesValidator = require('../middleware/votesValidator');

var _votesValidator2 = _interopRequireDefault(_votesValidator);

var _validateInput = require('../middleware/validateInput');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description votes routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
var voteRoutes = function voteRoutes(router) {
  router.post('/upVotes', _authorization2.default.authorize, _validateInput.validateParams, _votesValidator2.default, _votes2.default.upVotes);
  router.post('/downVotes', _authorization2.default.authorize, _validateInput.validateParams, _votesValidator2.default, _votes2.default.downVotes);
  router.get('/recipes?sort=upvotes&order=desc', _authorization2.default.authorize, _votes2.default.getMostVoted);
};

exports.default = voteRoutes;