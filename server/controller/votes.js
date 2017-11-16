import sequelize from 'sequelize';
import models from '../models';


const { votes } = models.votes;
const { recipes } = models.recipes;

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
    const {
      userId, recipeId, upVotes, downVotes
    } = req.body;
    if (userId && recipeId && upVotes && downVotes &&
     userId !== '' && recipeId !== '' && upVotes !== '' && downVotes !== '') {
      return votes
        .findAll({
          where: {
            recipeId,
            userId
          },
        })
        .then((recipeUpVoted) => {
          if (recipeUpVoted.length >= 1) {
            return res.status(200).send({
              message: 'You already liked this recipe '
            });
          }

          votes.create({
            userId,
            recipeId,
            upVotes,
            downVotes
          }).then(createdUpVoted => recipes.findOne({
            where: { id: recipeId }
          }).then((recipe) => {
            if (upVotes === 1) {
              recipe.increment('upVotes');
            } else if (upVotes === -1) {
              recipe.decrement('upVotes');
            } else {
              res.status(400).send({
                message:
                'You can only upvote or downvote.'
              });
            }

            res.status(200).send(createdUpVoted);
          }))
            .catch((err) => {
              res.status(500).send({ err });
            });
        })
        .catch((err) => {
          res.status(500).send({ err });
        });
    }
    res.status(400).send({
      message: 'Please enter a valid userid / recipe id'
    });
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { error } error
   */
  static getAllUpvoted(req, res) {
    votes.findAll({
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
