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
    const { review } = req.body;
    const userId = Number(req.body.userId);
    const recipeId = Number(req.body.recipeId);
    reviews
      .create({
        userId,
        recipeId,
        review
      })
      .then((reviewReturned) => {
        res.status(200).send(reviewReturned);
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
  }
}
export default Review;
