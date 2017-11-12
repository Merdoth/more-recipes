import models from '../models';
import sequelize from 'sequelize';

const votes = models.votes;
const recipes = models.recipes;

class Vote {
    
  static upVotes(req, res) {
    const{userId, recipeId, upVotes, downVotes} = req.body;
    if (userId && recipeId && upVotes && downVotes && userId !== '' && recipeId !== '' && upVotes !== '' && downVotes !== '') {
      return votes
        .findAll({
          where: {
            recipeId,
            userId
          },
        })
        .then(upVoted => {
          if(upVoted.length >= 1) {
            return res.status(200).send({
              message: 'You already liked this recipe '
            });
          }

          votes.create({
            userId,
            recipeId,
            upVotes,
            downVotes
          }).then(upVoted => {

            return recipes.findOne({
              where: { id: recipeId }
            }).then((recipe) => {
              if (upVotes == 1) {
                recipe.increment('upVotes');
              } else if (upVotes == -1) {
                recipe.decrement('upVotes');
              } else {
                res.status(400).send({
                  message: 'You can only upvote or downvote. +1 for upvote. -1 for downvote.'
                });
              }

              res.status(200).send(upvoted);
            });
          })
            .catch(err => {
              res.status(500).send({err});
            });
        })
        .catch(err => {
          res.status(500).send({err});
        });
    } else {
      res.status(400).send({
        message: 'Please enter a valid userid / recipe id'
      });
    }
  }

  static getAllUpvoted(req, res) {
    votes.findAll({
      order: sequelize.literal('max(upVoted) DESC'),
      limit: 6
    })
      .then((votes) => {
        res.status(200).send({votes});
      })
      .catch(err => {
        res.status(400).send({ error: err });
      });
  }

}

export default Vote;