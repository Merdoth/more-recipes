'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

var _token = require('../utils/token');

var _token2 = _interopRequireDefault(_token);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = _models2.default.users;
var Favorites = _models2.default.favorites;

var User = exports.User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'signUp',
    value: function signUp(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          username = _req$body.username;

      Users.findOne({
        where: {
          $or: [{
            email: email
          }, {
            username: username
          }]
        }
      }).then(function (user) {
        if (user) {
          return res.status(403).send({
            message: 'User already exists. Try a different email and/or username.'
          });
        }

        Users.create(req.body).then(function (user) {
          var newUser = user.dataValues;
          newUser.token = (0, _token2.default)(newUser);
          res.status(201).send({ message: 'User successfully created', data: newUser });
        }).catch(function (err) {
          res.status(400).send({ error: err });
        });
      });
    }
  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      Users.findAll({
        include: [{ model: Favorites }]
      }).then(function (users) {
        res.status(200).send({ users: users });
      }).catch(function (err) {
        res.status(400).send({ error: err });
      });
    }
  }, {
    key: 'signIn',
    value: function signIn(req, res) {
      var email = req.body.email;
      Users.findOne({
        where: {
          email: email
        }
      }).then(function (user) {
        if (user) {
          if (_bcrypt2.default.compareSync(req.body.password, user.password)) {
            var token = _jsonwebtoken2.default.sign({ id: user.id }, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24 // Token expires in 24 hours
            });

            return res.status(200).send({ message: 'Welcome', token: token });
          } else {
            return res.status(400).send({ message: 'Incorrect login details!' });
          }
        } else {
          return res.status(404).send({ message: 'User does not exist!' });
        }
      });
    }
  }]);

  return User;
}();

exports.default = User;