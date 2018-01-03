import models from '../models';

const { reviews } = models;

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
  static addReview(req, res) {
    const { userId, recipeId, review } = req.body;
    reviews.create({
      userId,
      recipeId,
      review,
    }).then(reviewReturned => res.status(200).send(reviewReturned));
  }
}
export default Review;
