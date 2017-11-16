import models from '../models';

const { reviews } = models.reviews;

/**
 * @class
 */
class Review {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { message } message
   */
  static add(req, res) {
    const { userId, recipeId, review } = req.body;
    if (review && userId && review !== '' && userId !== '') {
      return reviews
        .create({
          userId,
          recipeId,
          review,
        }).then(reviewReturned => res.status(200).send(reviewReturned));
    }
    res.status(400).send({
      message: 'Please enter a review'
    });
  }
}
export default Review;
