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
    const{userid, recipeid, review} = req.body;
    if (review && userid && review !== '' && userid !== '') {
      return reviews 
        .create({
          userid,
          recipeid,
          review,
        }).then(review => {
          return res.status(200).send(review);
        });
    } else{
      res.status(400).send({
        message: 'Please enter a review'
      });
    }
  }
}
export default Review;