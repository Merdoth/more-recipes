// import module dependencies
import models from '../models';
import pagination from '../utils/pagination';

// create reference database model
const { recipes, reviews, votes } = models;

/**
 * query: hold query limit and offset
 */
let query = {};

/**
 * @class
 */
class Recipe {
  /**
   * @description add recipe controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static addRecipe(req, res) {
    const {
      recipeName, ingredients, preparation, image
    } = req.body;
    recipes
      .create({
        userId: req.decoded.id,
        recipeName,
        ingredients,
        preparation,
        image
      })
      .then(createdRecipe =>
        res
          .status(200)
          .send({ message: 'Recipe successfully added', createdRecipe }))
      .catch(error => res.status(500).send({ error }));
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { message } message
   */
  static getOneRecipe(req, res) {
    return recipes
      .findOne({
        where: {
          id: req.params.recipeId
        },
        include: [{ model: reviews, votes }]
      })
      .then((recipesFound) => {
        if (!recipesFound || recipesFound.length < 1) {
          return res.status(404).send({
            status: 'Not Found',
            message: 'No recipes found. Please try to create some.'
          });
        }
        if (recipesFound) {
          return res.status(200).send(recipesFound);
        }
      })
      .catch(error => res.status(400).send({ error }));
  }

  /**
   * @description get all recipe controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static getAllRecipes(req, res) {
    let { limit, offset, page } = req.query;
    page = page || 1;
    limit = limit || 6;
    offset = limit * (page - 1) || 0;
    if (req.query.sort === 'upVotes' && req.query.order === 'des') {
      query = {
        include: [{ model: reviews, votes }],
        order: [['upVotes', 'DESC']],
        limit: 6
      };
    } else {
      query = {
        include: [{ model: reviews }],
        limit,
        offset,
        order: [['id', 'DESC']]
      };
    }
    /**
     * query the database for all recipes
     */
    recipes
      .findAndCountAll(query)
      .then((recipesFound) => {
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
        const paginate = pagination(
          query.limit,
          query.offset,
          recipesFound.count
        );
        if (recipesFound) {
          return res.status(200).send({
            paginate,
            recipesFound
          });
        }
        return res.status(404).send({ message: 'Recipe not found' });
      })
      .catch(error => res.status(500).send({ error }));
  }

  /**
   * @description get user recipes controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static getUserRecipes(req, res) {
    const userId = req.decoded.id;
    if (req.query.sort === 'createdAt' && req.query.order === 'des') {
      query = {
        include: [{ model: reviews, votes }],
        order: [['createdAt', 'DESC']]
      };
    } else {
      query = {
        include: [{ model: reviews, votes }]
      };
    }
    return recipes
      .findAll({
        where: { userId }
      })
      .then((recipesFound) => {
        if (recipesFound.length < 1) {
          return res.status(404).send({
            message: 'No recipes found. Please try to create some.'
          });
        }
        if (recipesFound) {
          return res.status(200).send(recipesFound);
        }
        return res.status(404).send({ message: 'Recipe not found' });
      })
      .catch(error => res.status(500).send({ error }));
  }

  /**
   * @description update recipe controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static updateUserRecipes(req, res) {
    const { id } = req.params;
    const {
      recipeName, preparation, ingredients, image
    } = req.body;

    return (
      recipes
        // query database to check if recipe exist
        .find({
          where: {
            id
          }
        })
        .then((recipe) => {
          if (recipe) {
            return recipe
              .update({
                recipeName: recipeName || recipe.recipeName,
                ingredients: ingredients || recipe.ingredients,
                preparation: preparation || recipe.preparation,
                image
              })
              .then((updatedRecipe) => {
                res.status(200).send({
                  message: 'Recipe successfully updated',
                  updatedRecipe
                });
              })
              .catch(error => res.status(500).send({ error }));
          }
          return res.status(404).send({ message: 'Recipe does not exist!' });
        })
    );
  }

  /**
   * @description delete recipe controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static deleteUserRecipes(req, res) {
    const { id } = req.params;
    return (
      recipes
        // query db to check if recipe exist
        .find({
          where: {
            id
          }
        })
        .then((recipe) => {
          if (recipe) {
            recipe
              .destroy()
              .then(() => res.status(200).send({ message: 'Recipe deleted!' }));
          } else {
            res.status(404).send({ message: 'Recipe does not exist!' });
          }
        })
        .catch(error => res.status(500).send({ error }))
    );
  }

  /**
   * @description search by title or ingredients controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static searchByRecipeNameOrIngredient(req, res) {
    if (req.query.recipeName) {
      query = {
        where: {
          recipeName: {
            $iLike: `%${req.query.recipeName.trim()}%`
          }
        }
      };
    } else {
      query = {
        where: {
          ingredients: {
            $iLike: `%${req.query.ingredients.trim()}%`
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
    })
      .then((recipe) => {
        if (recipe.rows.length <= 0) {
          return res
            .status(404)
            .send({ message: 'Search term did not match any recipe' });
        }

        /**
         * pass query limit, query offset, recipe.count to pagenate helper
         * and return totalCount, currentPage, pageCount, and pageSize
         * to pagenation
         */
        const paginate = pagination(query.limit, query.offset, recipes.count);

        return res.status(200).send({
          paginate,
          recipes: recipe.rows
        });
      })
      .catch(error => res.status(500).send({ error }));
  }
}
export default Recipe;
