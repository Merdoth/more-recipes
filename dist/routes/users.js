'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

var _validateInput = require('../middleware/validateInput');

var _authorization = require('../middleware/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

var _checkUserExists = require('../middleware/checkUserExists');

var _checkUserExists2 = _interopRequireDefault(_checkUserExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description user routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
var userRoutes = function userRoutes(router) {
  router.get('/users', _user2.default.getAllUsers);
  router.get('/users/:id', _authorization2.default.authorize, _user2.default.getOneUser);
  router.post('/users/signup', _validateInput.signUpValidator, _checkUserExists2.default, _user2.default.signUpUser);
  router.post('/users/signin', _validateInput.signInValidator, _user2.default.signInUser);
};

exports.default = userRoutes;