'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var votes = _models2.default.votes.votes;

/**
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @return { message } message
 */

var upVotedRecipes = function upVotedRecipes(req, res, next) {
  var _req$body = req.body,
      userId = _req$body.userId,
      recipeId = _req$body.recipeId,
      upVotes = _req$body.upVotes,
      downVotes = _req$body.downVotes;


  if (!userId || userId.trim() === '') {
    return res.status(400).send({
      message: 'Please enter a valid userid!'
    });
  }
  if (!recipeId || recipeId.trim() === '') {
    return res.status(400).send({
      message: 'Please enter valid recipeid!'
    });
  }
  if (!upVotes || upVotes.trim() === '') {
    return res.status(400).send({ message: 'Please enter an upvote!' });
  }
  if (!downVotes || downVotes.trim() === '') {
    return res.status(400).send({ message: 'Please enter a downvote!' });
  }

  votes.findAll({
    where: {
      recipeId: recipeId,
      userId: userId
    }
  }).then(function (recipeUpVoted) {
    if (recipeUpVoted.length >= 1) {
      return res.status(200).send({
        message: 'You already liked this recipe '
      });
    }
  }).catch(function (err) {
    res.status(500).send({ err: err });
  });
  next();
};

exports.default = upVotedRecipes;