'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Favorites = _models2.default.favorites;

var Favorite = function () {
  function Favorite() {
    _classCallCheck(this, Favorite);
  }

  _createClass(Favorite, null, [{
    key: 'makeFavorite',

    /**
     * 
     * 
     * @static
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Favorite
     */
    value: function makeFavorite(req, res) {
      var _req$body = req.body,
          userid = _req$body.userid,
          recipeid = _req$body.recipeid;

      if (recipeid && userid && recipeid !== '' && userid !== '') {
        return Favorites.findAll({
          where: {
            recipeid: recipeid,
            userid: userid
          }
        }).then(function (favorited) {
          if (favorited.length >= 1) {
            return res.status(200).send({
              message: 'You have already favorited this recipe'
            });
          }

          Favorites.create({
            userid: userid,
            recipeid: recipeid
          }).then(function (favorited) {
            return res.status(200).send(favorited);
          }).catch(function (err) {
            res.status(500).send({ err: err });
          });
        }).catch(function (err) {
          res.status(500).send({ err: err });
        });
      } else {
        res.status(400).send({
          message: 'Please enter a valid user id / recipe id'
        });
      }
    }
  }, {
    key: 'getFavorites',
    value: function getFavorites(req, res) {
      return Favorites.all().then(function (favorites) {
        res.status(200).send({ favorites: favorites });
      }).catch(function (err) {
        res.status(500).send({ err: err });
      });
    }
  }]);

  return Favorite;
}();

exports.default = Favorite;