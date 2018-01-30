'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import module dependencies


var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Votes = _models2.default.votes;
var Recipes = _models2.default.recipes;

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
     * @description up vote recipe controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */
    value: function upVotes(req, res) {
      var userId = req.decoded.id;
      var recipeId = Number(req.body.recipeId);
      var upVotes = Number(req.body.upVotes);
      Votes.create({
        userId: userId,
        recipeId: recipeId,
        upVotes: upVotes
      }).then(function (createdUpVoted) {
        return Recipes.findOne({
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
     * @description down vote recipe controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */

  }, {
    key: 'downVotes',
    value: function downVotes(req, res) {
      var userId = req.decoded.id;
      var recipeId = Number(req.body.recipeId);
      var downVotes = Number(req.body.downVotes);
      Votes.create({
        userId: userId,
        recipeId: recipeId,
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
     * @description get most upvoted controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */

  }, {
    key: 'getMostVoted',
    value: function getMostVoted(req, res) {
      Votes.findAll({
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