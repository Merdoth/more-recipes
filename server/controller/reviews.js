import models from '../models';

const reviews = models.reviews;

class Review {
  /**
   * 
   * 
   * @static
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Review
   */
  static add(req, res) {
    const { review, userId } = req.body;
    if(!review) {
      res.status(400).send({
        Message: 'Please Enter Review '
      });
    }else {
      return reviews
        .create({
          userId: userId,
          review: review,
        }).then(created => {
          return res.status(200).send(created);
        });
    }
  }
}

export default Review;