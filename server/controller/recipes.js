import models from '../models';

const { recipes, reviews, votes } = models;

/**
 * @class
 */
class Recipe {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { createdRecipe } createdRecipe
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
          .send({ message: 'Recipe successfully added', createdRecipe }));
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
  static getAllRecipes(req, res) {
    let query = {};
    if (req.query.sort === 'upVotes' && req.query.order === 'des') {
      query = {
        include: [{ model: reviews, votes }],
        order: [['upVotes', 'DESC']],
        limit: 6
      };
    } else {
      query = {
        include: [{ model: reviews, votes }]
      };
    }
    recipes.findAll(query).then((recipesFound) => {
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
  static getUserRecipes(req, res) {
    let query = {};
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
    recipes.findById(query).then((recipesFound) => {
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
  static updateUserRecipes(req, res) {
    const { id } = req.params;
    const {
      recipeName,
      preparation,
      ingredients,
      upVotes,
      downVotes,
      image
    } = req.body;

    return recipes
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
              upVotes: recipe.upVotes + upVotes || 0,
              downVotes: recipe.downVotes + downVotes || 0,
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
      });
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { message } message
   */
  static deleteUserRecipes(req, res) {
    const { id } = req.params;
    return recipes
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
      .catch(error => res.status(500).send({ error }));
  }
}

export default Recipe;
