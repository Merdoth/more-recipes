'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _signup = require('../shared/validations/signup');

var _signup2 = _interopRequireDefault(_signup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var userRoutes = function userRoutes(router) {
  router.get('/users/', _user2.default.getAllUsers);
  router.post('/users/signup', _user2.default.signUp);
  router.post('/users/signin', _user2.default.signIn);

  router.post('/', function (req, res) {
    var _validateInput = (0, _signup2.default)(req.body),
        errors = _validateInput.errors,
        isValid = _validateInput.isValid;

    if (isValid) {
      res.send({ success: true });
    } else {
      res.status(400).send(errors);
    }
  });
};

exports.default = userRoutes;