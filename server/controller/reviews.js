import models from '../models';
// import recipes from '../routes/recipes';

const { reviews, recipes } = models;

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
    const userId = Number(req.decoded.id);
    const recipeId = Number(req.params.recipeId);

    recipes
      .findById(recipeId)
      .then((recipe) => {
        if (recipe) {
          reviews
            .findOne({
              where: {
                userId,
                recipeId,
                review
              }
            })
            .then((foundReview) => {
              if (foundReview) {
                res.status(409).send({
                  message: 'Your already have a review with same review'
                });
              } else {
                reviews
                  .create({
                    userId,
                    recipeId,
                    review
                  })
                  .then((reviewReturned) => {
                    res.status(200).send({
                      message: 'Made review successfully',
                      reviewReturned
                    });
                  });
              }
            });
        } else {
          res.status(404).json({
            succes: false,
            message: `No recipe with ID '${recipeId}' `
          });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error });
      });
  }
}
export default Review;
