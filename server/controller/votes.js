import models from '../models';
import sequelize from 'sequelize';

const votes = models.votes;

class Vote {
    
  static upVotes(req, res) {
    const{userid, recipeid, upvotes} = req.body;
    if (userid && recipeid && upvotes && userid !== '' && recipeid !== '' && upvotes !== '') {
      return votes
        .findAll({
          where: {
            recipeid,
            userid
          },
        })
        .then(upvoted => {
          if(upvoted.length >= 1) {
            return res.status(200).send({
              message: 'You already liked this recipe '
            });
          }

          votes.create({
            userid,
            recipeid,
          }).then(upvoted => {
            return res.status(200).send(upvoted);
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
      order: sequelize.literal('max(upvoted) DESC')
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