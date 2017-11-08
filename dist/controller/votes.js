'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var votes = _models2.default.votes;

var Vote = function () {
  function Vote() {
    _classCallCheck(this, Vote);
  }

  _createClass(Vote, null, [{
    key: 'upVotes',
    value: function upVotes(req, res) {
      var _req$body = req.body,
          userid = _req$body.userid,
          recipeid = _req$body.recipeid,
          upvotes = _req$body.upvotes;

      if (userid && recipeid && upvotes && userid !== '' && recipeid !== '' && upvotes !== '') {
        return votes.findAll({
          where: {
            recipeid: recipeid,
            userid: userid
          }
        }).then(function (upvoted) {
          if (upvoted.length >= 1) {
            return res.status(200).send({
              message: 'You already liked this recipe '
            });
          }

          votes.create({
            userid: userid,
            recipeid: recipeid
          }).then(function (upvoted) {
            return res.status(200).send(upvoted);
          }).catch(function (err) {
            res.status(500).send({ err: err });
          });
        }).catch(function (err) {
          res.status(500).send({ err: err });
        });
      } else {
        res.status(400).send({
          message: 'Please enter a valid userid / recipe id'
        });
      }
    }
  }, {
    key: 'getAllUpvoted',
    value: function getAllUpvoted(req, res) {
      votes.findAll({
        order: _sequelize2.default.literal('max(upvoted) DESC')
      }).then(function (votes) {
        res.status(200).send({ votes: votes });
      }).catch(function (err) {
        res.status(400).send({ error: err });
      });
    }
  }]);

  return Vote;
}();

exports.default = Vote;