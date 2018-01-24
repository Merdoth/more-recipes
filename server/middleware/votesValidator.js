import models from '../models';

const { votes } = models.votes;

/**
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @return { message } message
 */
const upVotedRecipes = (req, res, next) => {
  const {
    userId, recipeId, upVotes, downVotes
  } = req.body;

  if (!userId || userId.trim() === '') {
    return res.status(400).send({
      message: 'Please enter a valid userid!'
    });
  }
  if (!recipeId || recipeId.trim() === '') {
    return res.status(400).send({
      message: 'Please enter valid recipeid!'
    });
  }
  if (!upVotes || upVotes.trim() === '') {
    return res.status(400).send({ message: 'Please enter an upvote!' });
  }
  if (!downVotes || downVotes.trim() === '') {
    return res.status(400).send({ message: 'Please enter a downvote!' });
  }

  votes.findAll({
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
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
  next();
};

export default upVotedRecipes;
