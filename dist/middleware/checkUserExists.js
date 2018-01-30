'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _models2.default.users;

/**
 * @description checks if user exists
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */
// import models from model directory
var checkUserExists = function checkUserExists(req, res, next) {
  var _req$body = req.body,
      userName = _req$body.userName,
      email = _req$body.email;

  return Users.findOne({
    where: {
      $or: [{
        email: email
      }, {
        userName: userName
      }]
    }
  }).then(function (user) {
    if (user) {
      return res.status(409).send({
        message: 'User already exists. Try a different email and/or username.'
      });
    }
    next();
  }).catch(function (err) {
    res.status(400).send({ error: err });
  });
};

exports.default = checkUserExists;