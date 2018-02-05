// import models from models directory
import models from '../models';

// create reference database model
const { reviews, recipes, user } = models;

/**
 * @class
 */
class Review {
  /**
   * @description post review controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
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
                      message: 'Review successfully added',
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

  /**
   * @description get recipe reviews controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static getReview(req, res) {
    reviews
      .findAll({
        include: {
          model: user,
          attributes: ['userName']
        },
        where: {
          recipeId: req.params.id
        }
      })
      .then((reviewFound) => {
        if (reviewFound.length === 0) {
          return res.status(404).send({
            message: 'Recipe not found'
          });
        }
        return res.status(200).send(reviewFound);
      })
      .catch(error => res.status(400).send({ message: error }));
  }
}
export default Review;
