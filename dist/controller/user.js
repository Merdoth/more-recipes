'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

var _token = require('../utils/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = _models2.default.users;
var Favorites = _models2.default.favorites;

/**
 * @class
 */

var User = exports.User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'signUpUser',

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { message } message
     */
    value: function signUpUser(req, res) {
      Users.create(req.body).then(function (userCreated) {
        var newUser = userCreated.dataValues;
        var token = (0, _token2.default)(newUser);
        return res.status(201).send({
          message: 'User successfully created',
          user: {
            userName: newUser.userName,
            email: newUser.email,
            token: token
          }
        });
      }).catch(function (err) {
        return res.status(400).send({ error: err });
      });
    }

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { error } error
     */

  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      Users.findAll({
        include: [{ model: Favorites }],
        attributes: ['userName', 'email']
      }).then(function (users) {
        res.status(200).send({ users: users });
      }).catch(function (err) {
        res.status(404).send({ error: err });
      });
    }

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { error } error
     */

  }, {
    key: 'getOneUser',
    value: function getOneUser(req, res) {
      Users.findById(req.params.id, {
        include: [{ model: Favorites }],
        attributes: ['userName', 'email']
      }).then(function (users) {
        res.status(200).send({ users: users });
      }).catch(function (err) {
        res.status(404).send({ error: err });
      });
    }

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { message } message
     */

  }, {
    key: 'signInUser',
    value: function signInUser(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      Users.findOne({
        where: {
          email: email
        }
      }).then(function (user) {
        if (user) {
          if (_bcrypt2.default.compareSync(password, user.password)) {
            var token = _jsonwebtoken2.default.sign({ id: user.id, userName: user.userName, email: user.email }, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24 // Token expires in 24 hours
            });

            return res.status(200).send({ message: 'Welcome', token: token });
          }
          return res.status(400).send({ message: 'Incorrect login details!' });
        }
        return res.status(404).send({ message: 'User does not exist!' });
      });
    }
  }]);

  return User;
}();

exports.default = User;