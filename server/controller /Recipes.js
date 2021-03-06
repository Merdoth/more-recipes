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
        recipeName: recipeName.toLowerCase(),
        description: description.toLowerCase(),
        ingredients: ingredients.toLowerCase(),
        preparation: preparation.toLowerCase(),
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
    if ((typeof limit !== 'number') || (typeof offset !== 'number')) {
      return res.status(404).send({
        message: 'Limit or Offset must be a number.'
      });
    }
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
      .then((userRecipes) => {
        if (userRecipes.count < 1) {
          return res.status(404).send({
            message: 'No recipes found. Please try to create one.'
          });
        }
        query.offset = req.query.offset || 0;
        query.limit = req.query.limit || 6;
        const paginate = pagination(
          query.limit,
          query.offset,
          userRecipes.count
        );
        if (userRecipes) {
          return res.status(200).send({
            paginate,
            userRecipes
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
    const userId = req.decoded.id;
    const { errors, isValid } = validateRecipe(req.body);
    if (!isValid) {
      return res.status(400).send({ error: errors });
    }
    const { id } = req.params;
    const {
      recipeName, description, preparation, ingredients, image
    } = req.body;
    return (
      recipes
        .findOne({ where: { id, userId } })
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
          return res.status(404).send({ message: 'You can not update this recipe!' });
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
    const userId = req.decoded.id;
    return (
      recipes
        .findOne({ where: { id } })
        .then((recipe) => {
          if (recipe) {
            if (recipe.userId === userId) {
              recipe.destroy()
                .then(() => res.status(200).json({
                  message: 'Recipe deleted',
                }));
            } else {
              return res.status(401).json({
                message: 'You are not authorized to delete this recipe'
              });
            }
          } else {
            return res.status(404).json({
              message: 'Not found'
            });
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
    if ((typeof Number(limit) !== 'number') || (typeof Number(offset) !== 'number')) {
      return res.status(404).send({
        message: 'Limit or Offset must be a number.'
      });
    }
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
          if (recipe.rows.length === 0) {
            return res.status(404).send({
              message: 'No recipe found!!'
            });
          }
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
