'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var reviews = _models2.default.reviews;

/**
 * @class
 */

var Review = function () {
  function Review() {
    _classCallCheck(this, Review);
  }

  _createClass(Review, null, [{
    key: 'addReview',

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { message } message
     */
    value: function addReview(req, res) {
      var _req$body = req.body,
          userId = _req$body.userId,
          recipeId = _req$body.recipeId,
          review = _req$body.review;

      reviews.create({
        userId: userId,
        recipeId: recipeId,
        review: review
      }).then(function (reviewReturned) {
        return res.status(200).send(reviewReturned);
      });
    }
  }]);

  return Review;
}();

exports.default = Review;