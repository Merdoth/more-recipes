'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import module dependencies


var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _pagination = require('../utils/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// create reference database model
var recipes = _models2.default.recipes,
    reviews = _models2.default.reviews,
    votes = _models2.default.votes;

/**
 * query: hold query limit and offset
 */

var query = {};

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
     * @description add recipe controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
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
      }).catch(function (error) {
        return res.status(500).send({ error: error });
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
        if (!recipesFound || recipesFound.length < 1) {
          return res.status(404).send({
            status: 'Not Found',
            message: 'No recipes found. Please try to create some.'
          });
        }
        if (recipesFound) {
          return res.status(200).send(recipesFound);
        }
      }).catch(function (error) {
        return res.status(400).send({ error: error });
      });
    }

    /**
     * @description get all recipe controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */

  }, {
    key: 'getAllRecipes',
    value: function getAllRecipes(req, res) {
      var _req$query = req.query,
          limit = _req$query.limit,
          offset = _req$query.offset,
          page = _req$query.page;

      page = page || 1;
      limit = limit || 6;
      offset = limit * (page - 1) || 0;
      if (req.query.sort === 'upVotes' && req.query.order === 'des') {
        query = {
          include: [{ model: reviews, votes: votes }],
          order: [['upVotes', 'DESC']],
          limit: 6
        };
      } else {
        query = {
          include: [{ model: reviews }],
          limit: limit,
          offset: offset,
          order: [['id', 'DESC']]
        };
      }
      /**
       * query the database for all recipes
       */
      recipes.findAndCountAll(query).then(function (recipesFound) {
        if (recipesFound.length < 1) {
          return res.status(404).send({
            message: 'No recipes found. Please try to create some.'
          });
        }

        /**
         * query limit: get query limit if supplie else use default
         * query offset: get query offset if supplie else use default
         */
        query.offset = req.query.offset || 0;
        query.limit = req.query.limit || 6;

        /**
         * pass query limit, query offset, recipeFound.count to pagenate utilis
         * and return totalCount, currentPage, pageCount, and pageSize
         * to pagination
         */
        var paginate = (0, _pagination2.default)(query.limit, query.offset, recipesFound.count);
        if (recipesFound) {
          return res.status(200).send({
            paginate: paginate,
            recipesFound: recipesFound
          });
        }
        return res.status(404).send({ message: 'Recipe not found' });
      }).catch(function (error) {
        return res.status(500).send({ error: error });
      });
    }

    /**
     * @description get user recipes controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */

  }, {
    key: 'getUserRecipes',
    value: function getUserRecipes(req, res) {
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
      }).catch(function (error) {
        return res.status(500).send({ error: error });
      });
    }

    /**
     * @description update recipe controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */

  }, {
    key: 'updateUserRecipes',
    value: function updateUserRecipes(req, res) {
      var id = req.params.id;
      var _req$body2 = req.body,
          recipeName = _req$body2.recipeName,
          preparation = _req$body2.preparation,
          ingredients = _req$body2.ingredients,
          image = _req$body2.image;


      return recipes
      // query database to check if recipe exist
      .find({
        where: {
          id: id
        }
      }).then(function (recipe) {
        if (recipe) {
          return recipe.update({
            recipeName: recipeName || recipe.recipeName,
            ingredients: ingredients || recipe.ingredients,
            preparation: preparation || recipe.preparation,
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
     * @description delete recipe controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */

  }, {
    key: 'deleteUserRecipes',
    value: function deleteUserRecipes(req, res) {
      var id = req.params.id;

      return recipes
      // query db to check if recipe exist
      .find({
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

    /**
     * @description search by title or ingredients controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */

  }, {
    key: 'searchByRecipeNameOrIngredient',
    value: function searchByRecipeNameOrIngredient(req, res) {
      if (req.query.recipeName) {
        query = {
          where: {
            recipeName: {
              $iLike: '%' + req.query.recipeName.trim() + '%'
            }
          }
        };
      } else {
        query = {
          where: {
            ingredients: {
              $iLike: '%' + req.query.ingredients.trim() + '%'
            }
          }
        };
      }

      /**
       * query limit: get query limit if supplie else use default
       * query offset: get query offset if supplie else use default
       */
      query.limit = req.query.limit || 8;
      query.offset = req.query.offset || 0;

      /**
       * query the db for all recipes
       * left join Reviews as reviews
       * left join Favourites as favourites
       * left join left join Votings as votings
       * ordered by 'id' descending
       */
      Recipe.findAndCountAll(query, {
        order: [['id', 'DESC']],
        limit: query.limit,
        offset: query.offset
      }).then(function (recipe) {
        if (recipe.rows.length <= 0) {
          return res.status(404).send({ message: 'Search term did not match any recipe' });
        }

        /**
         * pass query limit, query offset, recipe.count to pagenate helper
         * and return totalCount, currentPage, pageCount, and pageSize
         * to pagenation
         */
        var paginate = (0, _pagination2.default)(query.limit, query.offset, recipes.count);

        return res.status(200).send({
          paginate: paginate,
          recipes: recipe.rows
        });
      }).catch(function (error) {
        return res.status(500).send({ error: error });
      });
    }
  }]);

  return Recipe;
}();

exports.default = Recipe;