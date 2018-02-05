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
    const { id } = req.params;
    if (!userId && id) {
      return res.status(400).json({
        succes: false,
        message: 'user ID or Recipe ID is invalid'
      });
    }
    Votes.findCreateFind({
      where: {
        userId,
        recipeId: id
      }
    })
      .spread((vote, created) => {
        if (created) {
          vote.update({ voted: 'upVote' });
          return Recipes.findOne({ where: { id } }).then((recipe) => {
            recipe.increment('upVotes').then(() => {
              res.status(201).json({
                message: 'Your vote has been recorded',
                recipe
              });
            });
          });
        } else if (!created && vote.voted === 'upVote') {
          vote.destroy();
          return Recipes.findOne({ where: { id } }).then((recipe) => {
            if (recipe) {
              recipe.decrement('upVotes').then(() => {
                res.status(200).send({
                  message: 'Your vote has been removed',
                  recipe
                });
              });
            } else {
              res.status(404).send({
                message: 'Recipe not found',
                recipe
              });
            }
          });
        } else if (!created && vote.voted === 'downVote') {
          vote.update({ voted: 'upVote' });
          return Recipes.findOne({ where: { id } }).then((recipe) => {
            recipe.increment('upVotes');
            recipe
              .decrement('downVotes')
              .then(() => {
                recipe.reload();
              })
              .then(() =>
                res.status(200).send({
                  message: 'Your vote has been added',
                  recipe
                }));
          });
        }
      })
      .catch((error) => {
        res.status(500).json(error.message);
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
    const { id } = req.params;

    if (!userId && id) {
      return res.status(400).json({
        succes: false,
        message: 'user ID or Recipe ID is invalid'
      });
    }
    Votes.findCreateFind({
      where: {
        userId,
        recipeId: id
      }
    })
      .spread((vote, created) => {
        if (created) {
          vote.update({ voted: 'downVote' });
          return Recipes.findOne({ where: { id } }).then((recipe) => {
            recipe.increment('downVotes').then(() => {
              res.status(201).json({
                message: 'Your downvote has been recorded',
                recipe
              });
            });
          });
        } else if (!created && vote.voted === 'downVote') {
          vote.destroy();
          return Recipes.findOne({ where: { id } }).then((recipe) => {
            if (recipe) {
              recipe.decrement('downVotes').then(() => {
                res.status(200).send({
                  message: 'Your downvote has been removed',
                  recipe
                });
              });
            } else {
              res.status(404).send({
                message: 'Recipe not found',
                recipe
              });
            }
          });
        } else if (!created && vote.voted === 'upVote') {
          vote.update({ voted: 'downVote' });
          return Recipes.findOne({ where: { id } }).then((recipe) => {
            recipe.increment('downVotes');
            recipe
              .decrement('upVotes')
              .then(() => {
                recipe.reload();
              })
              .then(() =>
                res.status(200).send({
                  message: 'Your vote has been added',
                  recipe
                }));
          });
        }
      })
      .catch(error => res.status(500).json(error.message));
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
