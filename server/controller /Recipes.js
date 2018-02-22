import models from '../models';
import pagination, { paginates } from '../utils/pagination';
import validateRecipe from '../validations/validateRecipe';


const {
  users, recipes, reviews, votes
} = models;

let query = {};

/**
 * @class
 */
class Recipes {
  /**
   * @description add recipe controller
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { Object } json - payload
   */
  static addRecipe(req, res) {
    const { errors, isValid } = validateRecipe(req.body);
    if (!isValid) {
      return res.status(400).send({ error: errors });
    }
    const {
      recipeName, description, ingredients, preparation, image
    } = req.body;
    recipes
      .create({
        userId: req.decoded.id,
        recipeName,
        description,
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
   * @description get one recipe controller
   *
   * @param { Object } req  - Request object
   * @param { Object } res - Response object
   *
   * @return { Object } json - payload
   */
  static getOneRecipe(req, res) {
    const { userId } = req.params;
    return recipes
      .findOne({
        where: {
          id: req.params.recipeId
        },
        include: [{ model: reviews }, { model: votes }]
      })
      .then((recipesFound) => {
        if (!recipesFound || recipesFound.length < 1) {
          return res.status(404).send({
            status: 'Not Found',
            message: 'No recipes found. Please try to create some.'
          });
        }
        if (recipesFound) {
          if (recipesFound.dataValues.userId !== Number(userId)) {
            return recipes
              .update(
                { views: recipesFound.dataValues.views + 1 },
                {
                  where: { id: req.params.recipeId },
                }
              )
              .then(() =>
                recipes
                  .findOne({
                    where: {
                      id: req.params.recipeId
                    },
                    include: [{ model: reviews }, { model: votes }]
                  })
                  .then((updatedRecipes) => {
                    res.status(200).send({
                      updatedRecipes
                    });
                  })
                  .catch((error) => {
                    res.status(400).send({ error });
                  }));
          } else {
            return res.status(200).send({
              recipesFound
            });
          }
        }
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  }

  /**
   * @description get all recipes controller
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { Object } json - payload
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
    recipes
      .findAndCountAll(query)
      .then((recipesFound) => {
        if (recipesFound.length < 1) {
          return res.status(404).send({
            message: 'No recipes found. Please try to create one.'
          });
        }
        query.offset = req.query.offset || 0;
        query.limit = req.query.limit || 6;
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
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { Object } json - payload
   */
  static getUserRecipes(req, res) {
    let { limit, offset, page } = req.query;
    page = page || 1;
    limit = Number(limit) || 6;
    offset = limit * (Number(page) - 1) || 0;
    const userId = req.decoded.id;

    if (req.query.sort === 'createdAt' && req.query.order === 'des') {
      query = {
        include: [{ model: reviews, votes }],
        order: [['createdAt', 'DESC']],
        limit: 6
      };
    } else {
      query = {
        include: [{ model: reviews, votes }],
        limit,
        offset,
        order: [['id', 'DESC']]
      };
    }
    recipes
      .findAndCountAll({
        where: { userId },
        limit,
        offset,
      })
      .then((recipesFound) => {
        if (recipesFound.count < 1) {
          return res.status(404).send({
            message: 'No recipes found. Please try to create one.'
          });
        }
        query.offset = req.query.offset || 0;
        query.limit = req.query.limit || 6;
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
   * @description update recipe controller
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { Object } json - payload
   */
  static updateUserRecipes(req, res) {
    const { id } = req.params;
    const {
      recipeName, description, preparation, ingredients, image
    } = req.body;

    return (
      recipes
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
                description: description || recipe.description,
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
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { Object } json - payload
   */
  static deleteUserRecipes(req, res) {
    const { id } = req.params;
    return (
      recipes
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
   * @description search recipe controller
   *
   * @param { Object } req - Request object
   * @param { Object } res - Response object
   *
   * @returns { Object } json - payload
   */
  static searchRecipe(req, res) {
    let { offset, limit } = req.query;
    limit = limit || 8;
    if (!req.query.name) {
      return res.status(404).send({
        success: false,
        message: 'no search parameter/limit',
      });
    }
    return recipes
      .findAndCountAll({
        offset: offset * limit,
        limit,
        where: {
          $or: [
            { recipeName: { $ilike: `%${req.query.name}%` } },
            { ingredients: { $ilike: `%${req.query.name}%` } }
          ]
        },
        include: [
          { model: users, attributes: ['fullName', 'userName'] },
        ]
      })
      .then((recipe) => {
        if (recipe) {
          return res.status(200).send({
            recipe,
            paginationData: paginates(recipe.count, limit, offset * 5)

          });
        } else {
          return res.status(404).send({
            message: 'No recipe found!!'
          });
        }
      }).catch((err) => {
        res.status(500).send({
          message: err.message
        });
      });
  }
}
export default Recipes;
