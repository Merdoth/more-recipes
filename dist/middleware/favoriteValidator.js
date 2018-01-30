'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Favorites = _models2.default.favorites;

/**
 * @description validate favorites fileds middleware
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */

// import models from model directory
var alreadyFavorited = function alreadyFavorited(req, res, next) {
  var _req$body = req.body,
      userId = _req$body.userId,
      recipeId = _req$body.recipeId;


  Favorites.findAll({
    where: {
      recipeId: recipeId,
      userId: userId
    }
  }).then(function (favorited) {
    if (favorited.length >= 1) {
      return res.status(200).send({
        message: 'You have already favorited this recipe'
      });
    }
  }).catch(function (err) {
    res.status(500).send({ err: err });
  });
  next();
};

exports.default = alreadyFavorited;