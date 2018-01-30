'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var votes = _models2.default.votes.votes;

/**
 * @description upVoted recipe Field
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */

var votedRecipes = function votedRecipes(req, res, next) {
  var _req$body = req.body,
      userId = _req$body.userId,
      recipeId = _req$body.recipeId;


  votes.findAll({
    where: {
      recipeId: recipeId,
      userId: userId
    }
  }).then(function (recipeVoted) {
    if (recipeVoted.length >= 1) {
      return res.status(200).send({
        message: 'You already liked this recipe '
      });
    }
  }).catch(function (err) {
    res.status(500).send({ err: err });
  });
  next();
};

exports.default = votedRecipes;