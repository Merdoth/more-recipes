// import models from model directory
import models from '../models';

const Favorites = models.favorites;

/**
 * @description validate favorites fileds middleware
 *
 * @method
 *
 * @param {Object} req - Request object
 *
 * @param {Object} res - Response object
 *
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */

const alreadyFavorited = (req, res, next) => {
  const { userId, recipeId } = req.body;

  Favorites.findAll({
    where: {
      recipeId,
      userId
    }
  })
    .then((favorited) => {
      if (favorited.length >= 1) {
        return res.status(200).send({
          message: 'You have already favorited this recipe'
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
  next();
};

export default alreadyFavorited;
