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

      if (!recipename) {
        res.status(400).send({
          message: 'Enter Recipe Name'
        });
      } else if (!ingredients) {
        res.status(400).send({
          message: 'Enter Ingredients'
        });
      } else if (!preparation) {
        res.status(400).send({
          message: 'Enter Preparation Steps'
        });
      } else {
        return recipes.create({
          userid: 1, //req.decoded.id,
          recipename: recipename,
          ingredients: [ingredients],
          preparation: preparation,
          upvotes: 0,
          downvotes: 0
        }).then(function (created) {
          return res.status(200).send(created);
        });
      }
    }
  }, {
    key: 'get',
    value: function get(req, res) {
      recipes.all().then(function (recipes) {
        if (!recipes) {
          return res.status(404).send({ message: 'Recipe not found' });
        } else {
          return res.status(200).send(recipes);
        }
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var id = req.params.Id;
      var _req$body2 = req.body,
          recipename = _req$body2.recipename,
          preparation = _req$body2.preparation;

      var ingredients = req.body.ingredients.split(',');
      console.log('hey');
      console.log(ingredients);
      return recipes.find({
        where: {
          id: id
        }
      }).then(function (isRecipe) {
        // console.log(isRecipe)
        if (isRecipe) {
          return isRecipe.update({
            recipename: recipename,
            ingredients: ingredients
          }).then(function (isRecipe) {
            console.log('hahahah');
            return res.status(200).send(isRecipe);
          }).catch(function (error) {
            console.log('error', error);
          });
        }
      });
    }
  }]);

  return Recipe;
}();

exports.default = Recipe;