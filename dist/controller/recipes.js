'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var recipes = _models2.default.recipes,
    reviews = _models2.default.reviews,
    votes = _models2.default.votes;

/**
 * @class
 */

var Recipe = function () {
  function Recipe() {
    _classCallCheck(this, Recipe);
  }

  _createClass(Recipe, null, [{
    key: 'addRecipe',

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { createdRecipe } createdRecipe
     */
    value: function addRecipe(req, res) {
      var _req$body = req.body,
          recipeName = _req$body.recipeName,
          ingredients = _req$body.ingredients,
          preparation = _req$body.preparation,
          image = _req$body.image;

      recipes.create({
        userId: req.decoded.id,
        recipeName: recipeName,
        ingredients: ingredients,
        preparation: preparation,
        image: image
      }).then(function (createdRecipe) {
        return res.status(200).send({ message: 'Recipe successfully added', createdRecipe: createdRecipe });
      });
    }

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { message } message
     */

  }, {
    key: 'getOneRecipe',
    value: function getOneRecipe(req, res) {
      return recipes.findOne({
        where: {
          id: req.params.recipeId
        },
        include: [{ model: reviews, votes: votes }]
      }).then(function (recipesFound) {
        if (recipesFound.length < 1) {
          return res.status(404).send({
            message: 'No recipes found. Please try to create some.'
          });
        }
        if (recipesFound) {
          return res.status(200).send(recipesFound);
        }
        return res.status(404).send({ message: 'Recipe not found' });
      });
    }

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { message } message
     */

  }, {
    key: 'getAllRecipes',
    value: function getAllRecipes(req, res) {
      var query = {};
      if (req.query.sort === 'upVotes' && req.query.order === 'des') {
        query = {
          include: [{ model: reviews, votes: votes }],
          order: [['upVotes', 'DESC']],
          limit: 6
        };
      } else {
        query = {
          include: [{ model: reviews, votes: votes }]
        };
      }
      recipes.findAll(query).then(function (recipesFound) {
        if (recipesFound.length < 1) {
          return res.status(404).send({
            message: 'No recipes found. Please try to create some.'
          });
        }

        if (recipesFound) {
          return res.status(200).send(recipesFound);
        }
        return res.status(404).send({ message: 'Recipe not found' });
      });
    }

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { message } message
     */

  }, {
    key: 'getUserRecipes',
    value: function getUserRecipes(req, res) {
      var query = {};
      if (req.query.sort === 'createdAt' && req.query.order === 'des') {
        query = {
          include: [{ model: reviews, votes: votes }],
          order: [['createdAt', 'DESC']]
        };
      } else {
        query = {
          include: [{ model: reviews, votes: votes }]
        };
      }
      recipes.findById(query).then(function (recipesFound) {
        if (recipes.length < 1) {
          return res.status(404).send({
            message: 'No recipes found. Please try to create some.'
          });
        }

        if (recipes) {
          return res.status(200).send(recipesFound);
        }
        return res.status(404).send({ message: 'Recipe not found' });
      });
    }

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { message } message
     */

  }, {
    key: 'updateUserRecipes',
    value: function updateUserRecipes(req, res) {
      var id = req.params.id;
      var _req$body2 = req.body,
          recipeName = _req$body2.recipeName,
          preparation = _req$body2.preparation,
          ingredients = _req$body2.ingredients,
          upVotes = _req$body2.upVotes,
          downVotes = _req$body2.downVotes,
          image = _req$body2.image;


      return recipes.find({
        where: {
          id: id
        }
      }).then(function (recipe) {
        if (recipe) {
          return recipe.update({
            recipeName: recipeName || recipe.recipeName,
            ingredients: ingredients || recipe.ingredients,
            preparation: preparation || recipe.preparation,
            upVotes: recipe.upVotes + upVotes || 0,
            downVotes: recipe.downVotes + downVotes || 0,
            image: image
          }).then(function (updatedRecipe) {
            res.status(200).send({
              message: 'Recipe successfully updated',
              updatedRecipe: updatedRecipe
            });
          }).catch(function (error) {
            return res.status(500).send({ error: error });
          });
        }
        return res.status(404).send({ message: 'Recipe does not exist!' });
      });
    }

    /**
     *
     * @param {req} req
     * @param {res} res
     * @return { message } message
     */

  }, {
    key: 'deleteUserRecipes',
    value: function deleteUserRecipes(req, res) {
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