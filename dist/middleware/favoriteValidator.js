'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Favorites = _models2.default.favorites;

var alreadyFavorited = function alreadyFavorited(req, res, next) {
  var _req$body = req.body,
      userId = _req$body.userId,
      recipeId = _req$body.recipeId;


  if (!recipeId || recipeId.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid recipeid!' });
  }

  if (!userId || userId.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid userid!' });
  }

  if (!recipeId && !userId) {
    return res.status(400).send({ message: 'All fields must be provided!' });
  }

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