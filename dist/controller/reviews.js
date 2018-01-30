'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import models from models directory


var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// create reference database model
var reviews = _models2.default.reviews,
    recipes = _models2.default.recipes,
    user = _models2.default.user;

/**
 * @class
 */

var Review = function () {
  function Review() {
    _classCallCheck(this, Review);
  }

  _createClass(Review, [{
    key: 'getReview',


    /**
       * @description get recipe reviews controller
       *
       * @param {Object} req - Request object
       * @param {Object} res - Response object
       *
       * @returns {Object} json - payload
       */
    value: function getReview(req, res) {
      reviews.findAll({
        include: {
          model: user,
          attributes: ['userName']
        },
        where: {
          recipeId: req.params.id
        }
      }).then(function (reviewFound) {
        if (reviewFound.length === 0) {
          return res.status(404).send({
            message: 'Recipe not found'
          });
        }
        return res.status(200).send(reviewFound);
      }).catch(function (error) {
        return res.status(400).send({ message: error });
      });
    }
  }], [{
    key: 'addReview',

    /**
     * @description post review controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */
    value: function addReview(req, res) {
      var review = req.body.review;

      var userId = Number(req.decoded.id);
      var recipeId = Number(req.params.recipeId);

      recipes.findById(recipeId).then(function (recipe) {
        if (recipe) {
          reviews.findOne({
            where: {
              userId: userId,
              recipeId: recipeId,
              review: review
            }
          }).then(function (foundReview) {
            if (foundReview) {
              res.status(409).send({
                message: 'Your already have a review with same review'
              });
            } else {
              reviews.create({
                userId: userId,
                recipeId: recipeId,
                review: review
              }).then(function (reviewReturned) {
                res.status(200).send({
                  message: 'Review successfully added',
                  reviewReturned: reviewReturned
                });
              });
            }
          });
        } else {
          res.status(404).json({
            succes: false,
            message: 'No recipe with ID \'' + recipeId + '\' '
          });
        }
      }).catch(function (error) {
        res.status(500).send({ message: error });
      });
    }
  }]);

  return Review;
}();

exports.default = Review;