'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Review = function () {
  function Review() {
    _classCallCheck(this, Review);
  }

  _createClass(Review, [{
    key: 'add',
    value: function add(req, res) {
      var _req$body = req.body,
          review = _req$body.review,
          userId = _req$body.userId;

      if (!review) {
        res.status(400).send({
          Message: 'Please Enter Review '
        });
      } else {
        var len = _db2.default.review.length;
        var id = 1 + len;
        _db2.default.review.push({
          id: id,
          userId: userId,
          review: review
        });
        return res.status(200).send(_db2.default.review[id - 1]);
      }
    }
  }]);

  return Review;
}();

exports.default = Review;