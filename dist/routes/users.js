'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../controller/user');

var _signUpValidator = require('../middleware/signUpValidator');

var _signUpValidator2 = _interopRequireDefault(_signUpValidator);

var _signInValidator = require('../middleware/signInValidator');

var _signInValidator2 = _interopRequireDefault(_signInValidator);

var _checkUserExists = require('../middleware/checkUserExists');

var _checkUserExists2 = _interopRequireDefault(_checkUserExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRoutes = function userRoutes(router) {
  router.get('/users', _user.User.getAllUsers);
  router.get('/users/:id', _user.User.getOneUser);
  router.post('/users/signup', _signUpValidator2.default, _checkUserExists2.default, _user.User.signUpUser);
  router.post('/users/signin', _signInValidator2.default, _user.User.signInUser);
};

exports.default = userRoutes;