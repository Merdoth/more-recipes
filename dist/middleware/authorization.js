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

exports.default = {
  authorize: function authorize(req, res, next) {
    var token = req.headers.authorization || req.body.authorization;
    // req.headers.authorization;
    if (token) {
      // verify token
      _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY, function (error, decoded) {
        if (error) {
          res.status(400).send({
            message: 'The token you provided is incorrect.'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if no token was provided
      return res.status(401).send({
        status: 401,
        message: 'You did not provide any access token.'
      });
    }
  }
};