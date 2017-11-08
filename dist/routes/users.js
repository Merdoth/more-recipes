'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRoutes = function userRoutes(router) {
  router.get('/users/', _user2.default.getAllUsers);
  router.post('/users/signup', _user2.default.signUp);
  router.post('/users/signin', _user2.default.signIn);
};

exports.default = userRoutes;