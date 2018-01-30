'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import models from models directory


var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// create reference to database model
var Favorites = _models2.default.favorites;

/**
 * @class
 */

var Favorite = function () {
  function Favorite() {
    _classCallCheck(this, Favorite);
  }

  _createClass(Favorite, null, [{
    key: 'addFavorite',

    /**
     * @description add favourite controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     *
     */
    value: function addFavorite(req, res) {
      var _req$body = req.body,
          userId = _req$body.userId,
          recipeId = _req$body.recipeId;

      Favorites.create({
        userId: userId,
        recipeId: recipeId
      }).then(function (foundRecipe) {
        return res.status(200).send(foundRecipe);
      }).catch(function (err) {
        res.status(404).send({ err: err });
      });
    }

    /**
     *
     * @description get user favourites controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     *
     */

  }, {
    key: 'getFavorites',
    value: function getFavorites(req, res) {
      return Favorites.all().then(function (favorites) {
        res.status(200).send({ favorites: favorites });
      }).catch(function (err) {
        res.status(404).send({ err: err });
      });
    }
  }]);

  return Favorite;
}();

exports.default = Favorite;