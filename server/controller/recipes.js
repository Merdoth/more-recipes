import models from '../models';


const { recipes } = models.recipes;
const { reviews } = models.reviews;
const { votes } = models.votes;

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
  static add(req, res) {
    const { recipeName, ingredients, preparation } = req.body;

    if (recipeName && ingredients && preparation &&
      recipeName !== '' && ingredients !== '' && preparation !== ''
    ) {
      return recipes
        .create({
          userId: req.decoded.id,
          recipeName,
          ingredients,
          preparation
        }).then(recipe => res.status(200).send(recipe));
    }
    res.status(400).send({
      message: 'All fields must be provided!'
    });
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { message } message
   */
  static get(req, res) {
    let query = {};
    if (req.query.sort === 'upvotes' && req.query.order === 'des') {
      query = {
        include: [{ model: reviews, votes }],
        order: [
          ['upovtes', 'DESC']
        ],
        limit: 6
      };
    } else {
      query = {
        include: [{ model: reviews, votes }]
      };
    }
    recipes.findAll(query).then((recipesFound) => {
      if (recipes.length < 1) {
        return res.status(404).send({
          message: 'No recipes found. Please try to create some.'
        });
      }

      if (recipesFound) {
        return res.status(200).send(recipes);
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
  static getMine(req, res) {
    let query = {};
    if (req.query.sort === 'createdAt' && req.query.order === 'des') {
      query = {
        include: [{ model: reviews, votes }],
        order: [
          ['createdAt', 'DESC']
        ],
      };
    } else {
      query = {
        include: [{ model: reviews, votes }]
      };
    }
    recipes.findAll(query).then((recipesFound) => {
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
  static update(req, res) {
    const { id } = req.params.id;
    const {
      recipeName, preparation, ingredients, upVotes, downVotes
    } = req.body;

    return recipes.find({
      where: {
        id
      }
    }).then((recipe) => {
      if (recipe) {
        return recipe.update({
          recipeName: recipeName || recipe.recipeName,
          ingredients: ingredients || recipe.ingredients,
          preparation: preparation || recipe.preparation,
          upVotes: recipe.upVotes + upVotes || 0,
          downVotes: recipe.downVotes + downVotes || 0
        })
          .then(updatedRecipe => res.status(200).send(updatedRecipe))
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
  static delete(req, res) {
    const { id } = req.params.id;
    return recipes.find({
      where: {
        id
      }
    }).then((recipe) => {
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
