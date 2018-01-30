// import module dependencies
import sequelize from 'sequelize';
import models from '../models';

const Votes = models.votes;
const Recipes = models.recipes;

/**
 * @class
 */
class Vote {
  /**
   * @description up vote recipe controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static upVotes(req, res) {
    const userId = req.decoded.id;
    const recipeId = Number(req.body.recipeId);
    const upVotes = Number(req.body.upVotes);
    Votes.create({
      userId,
      recipeId,
      upVotes
    })
      .then(createdUpVoted =>
        Recipes.findOne({
          where: { id: recipeId }
        }).then((recipe) => {
          if (upVotes === 1) {
            recipe.increment('upVotes');
          } else if (upVotes === -1) {
            recipe.decrement('upVotes');
          } else {
            res.status(400).send({
              message: 'You can only upvote or downvote.'
            });
          }

          res.status(200).send(createdUpVoted);
        }))
      .catch((err) => {
        res.status(500).send({ err });
      });
  }

  /**
   * @description down vote recipe controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static downVotes(req, res) {
    const userId = req.decoded.id;
    const recipeId = Number(req.body.recipeId);
    const downVotes = Number(req.body.downVotes);
    Votes.create({
      userId,
      recipeId,
      downVotes
    })
      .then((recipe) => {
        if (downVotes === 1) {
          recipe.increment('downVotes');
        } else if (downVotes === -1) {
          recipe.decrement('downVotes');
        } else {
          res.status(400).send({
            message: 'You can only upvote or downvote.'
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  }

  /**
   * @description get most upvoted controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static getMostVoted(req, res) {
    Votes.findAll({
      order: sequelize.literal('max(upVoted) DESC'),
      limit: 6
    })
      .then((existingVotes) => {
        res.status(200).send({ existingVotes });
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  }
}

export default Vote;
