'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var recipes = _models2.default.recipes;
var reviews = _models2.default.reviews;
var votes = _models2.default.votes;

var Recipe = function () {
  function Recipe() {
    _classCallCheck(this, Recipe);
  }

  _createClass(Recipe, null, [{
    key: 'add',

    /**
     * 
     * 
     * @static
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Recipe
     */
    value: function add(req, res) {
      var _req$body = req.body,
          recipename = _req$body.recipename,
          ingredients = _req$body.ingredients,
          preparation = _req$body.preparation;


      if (recipename && ingredients && preparation && recipename !== '' && ingredients !== '' && preparation !== '') {
        return recipes.create({
          userid: req.decoded.id,
          recipename: recipename,
          ingredients: ingredients,
          preparation: preparation
        }).then(function (recipe) {
          return res.status(200).send(recipe);
        });
      } else {
        res.status(400).send({
          message: 'All fields must be provided!'
        });
      }
    }
  }, {
    key: 'get',
    value: function get(req, res) {
      recipes.findAll({
        include: [{ model: reviews, votes: votes }]
      }).then(function (recipes) {
        if (recipes.length < 1) {
          return res.status(200).send({
            message: 'No recipes found. Please try to create some.'
          });
        }
        if (recipes) {
          return res.status(200).send(recipes);
        } else {
          return res.status(404).send({ message: 'Recipe not found' });
        }
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var id = req.params.id;
      var _req$body2 = req.body,
          recipename = _req$body2.recipename,
          preparation = _req$body2.preparation,
          ingredients = _req$body2.ingredients;


      return recipes.find({
        where: {
          id: id
        }
      }).then(function (recipe) {
        if (recipe) {
          return recipe.update({
            recipename: recipename || recipe.recipename,
            ingredients: ingredients || recipe.ingredients,
            preparation: preparation || recipe.preparation
          }).then(function (updatedRecipe) {
            return res.status(200).send(updatedRecipe);
          }).catch(function (error) {
            return res.status(500).send({ error: error });
          });
        } else {
          return res.status(404).send({ message: 'Recipe does not exist!' });
        }
      });
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
      var id = req.params.id;
      return recipes.find({
        where: {
          id: id
        }
      }).then(function (recipe) {
        if (recipe) {
          recipe.destroy().then(function () {
            return res.status(200).send({ message: 'Recipe deleted!' });
          });
        } else {
          res.status(404).send({ message: 'Recipe does not exist!' });
        }
      }).catch(function (error) {
        return res.status(500).send({ error: error });
      });
    }
  }]);

  return Recipe;
}();

exports.default = Recipe;