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

var Review = function () {
  function Review() {
    _classCallCheck(this, Review);
  }

  _createClass(Review, null, [{
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
          review = _req$body.review,
          userId = _req$body.userId;

      if (!review) {
        res.status(400).send({
          Message: 'Please Enter Review '
        });
      } else {
        return reviews.create({
          userId: userId,
          review: review
        }).then(function (created) {
          return res.status(200).send(created);
        });
      }
    }
  }]);

  return Review;
}();

exports.default = Review;