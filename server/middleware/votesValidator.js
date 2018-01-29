import models from '../models';

const { votes } = models.votes;

/**
 * @description upVoted recipe Field
 *
 * @param {Object} req - Request object
 *
 * @param {Object} res - Response object
 *
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */
const votedRecipes = (req, res, next) => {
  const { userId, recipeId } = req.body;

  votes
    .findAll({
      where: {
        recipeId,
        userId
      }
    })
    .then((recipeVoted) => {
      if (recipeVoted.length >= 1) {
        return res.status(200).send({
          message: 'You already liked this recipe '
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
  next();
};

export default votedRecipes;
