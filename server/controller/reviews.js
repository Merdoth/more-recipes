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
    const{userId, recipeId, review} = req.body;
    if (review && userId && review !== '' && userId !== '') {
      return reviews 
        .create({
          userId,
          recipeId,
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
