'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

exports.default = function (payload) {
  var secret = process.env.SECRET_KEY;
  var id = payload.id,
      username = payload.username,
      email = payload.email;

  return _jsonwebtoken2.default.sign({ id: id, username: username, email: email }, secret, { expiresIn: '24h' });
};