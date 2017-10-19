'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createclass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var reviews = _models2.default.reviews;

var Review = function () {
  function Review() {
    _classCallCheck(this, Review);
  }

  _createclass(Review, null, [{
    key: 'add',

    /**
     * 
     * 
     * @static
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Review
     */
    value: function add(req, res) {
      var _req$body = req.body,
          userid = _req$body.userid,
          recipeid = _req$body.recipeid,
          review = _req$body.review;

      if (review && userid && review !== '' && userid !== '') {
        return reviews.create({
          userid: userid,
          recipeid: recipeid,
          review: review
        }).then(function (review) {
          return res.status(200).send(review);
        });
      } else {
        res.status(400).send({
          message: 'Please enter a review'
        });
      }
    }
  }]);

  return Review;
}();

exports.default = Review;