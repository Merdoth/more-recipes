'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var votes = _models2.default.votes.votes;
var recipes = _models2.default.recipes.recipes;

/**
 * @class
 */

var Vote = function () {
  function Vote() {
    _classCallCheck(this, Vote);
  }

  _createClass(Vote, null, [{
    key: 'upVotes',

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { message } message
     */
    value: function upVotes(req, res) {
      var _req$body = req.body,
          userId = _req$body.userId,
          recipeId = _req$body.recipeId,
          upVotes = _req$body.upVotes,
          downVotes = _req$body.downVotes;

      votes.create({
        userId: userId,
        recipeId: recipeId,
        upVotes: upVotes,
        downVotes: downVotes
      }).then(function (createdUpVoted) {
        return recipes.findOne({
          where: { id: recipeId }
        }).then(function (recipe) {
          if (upVotes === 1) {
            recipe.increment('upVotes');
          } else if (upVotes === -1) {
            recipe.decrement('upVotes');
          } else {
            res.status(400).send({
              message: 'You can only upvote or downvote.'
            });
          }

          res.status(200).send(createdUpVoted);
        });
      }).catch(function (err) {
        res.status(500).send({ err: err });
      });
    }

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { message } message
     */

  }, {
    key: 'downVotes',
    value: function downVotes(req, res) {
      var _req$body2 = req.body,
          userId = _req$body2.userId,
          recipeId = _req$body2.recipeId,
          upVotes = _req$body2.upVotes,
          downVotes = _req$body2.downVotes;

      votes.create({
        userId: userId,
        recipeId: recipeId,
        upVotes: upVotes,
        downVotes: downVotes

      }).then(function (recipe) {
        if (downVotes === 1) {
          recipe.increment('downVotes');
        } else if (downVotes === -1) {
          recipe.decrement('downVotes');
        } else {
          res.status(400).send({
            message: 'You can only upvote or downvote.'
          });
        }
      }).catch(function (err) {
        res.status(500).send({ err: err });
      });
    }

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { error } error
     */

  }, {
    key: 'getAllUpvoted',
    value: function getAllUpvoted(req, res) {
      votes.findAll({
        order: _sequelize2.default.literal('max(upVoted) DESC'),
        limit: 6
      }).then(function (existingVotes) {
        res.status(200).send({ existingVotes: existingVotes });
      }).catch(function (err) {
        res.status(400).send({ error: err });
      });
    }
  }]);

  return Vote;
}();

exports.default = Vote;