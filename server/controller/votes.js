import sequelize from 'sequelize';
import models from '../models';

const Votes = models.votes;
const Recipes = models.recipes;

/**
 * @class
 */
class Vote {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { message } message
   */
  static upVotes(req, res) {
    console.log(req.body);
    const userId = req.decoded.id;
    const recipeId = Number(req.body.recipeId);
    const upVotes = Number(req.body.upVotes);
    console.log(upVotes, 'hello');
    const downVotes = Number(req.body.downVotes);
    Votes.create({
      userId,
      recipeId,
      upVotes,
      downVotes
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
        console.log(err, 'err');
        res.status(500).send({ err });
      });
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { message } message
   */
  static downVotes(req, res) {
    const {
      userId, recipeId, upVotes, downVotes
    } = req.body;
    Votes.create({
      userId,
      recipeId,
      upVotes,
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
   *
   * @param {req} req
   * @param {res} res
   * @return { error } error
   */
  static getAllUpvoted(req, res) {
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
