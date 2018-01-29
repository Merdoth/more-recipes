// import models from models directory
import models from '../models';

// create reference to database model
const Favorites = models.favorites;

/**
 * @class
 */
class Favorite {
  /**
   * @description add favourite controller
   *
   * @param {Object} req - Request object
   *
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   *
   */
  static addFavorite(req, res) {
    const { userId, recipeId } = req.body;
    Favorites.create({
      userId,
      recipeId
    })
      .then(foundRecipe => res.status(200).send(foundRecipe))
      .catch((err) => {
        res.status(404).send({ err });
      });
  }

  /**
   *
   * @description get user favourites controller
   *
   * @param {Object} req - Request object
   *
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   *
   */
  static getFavorites(req, res) {
    return Favorites.all()
      .then((favorites) => {
        res.status(200).send({ favorites });
      })
      .catch((err) => {
        res.status(404).send({ err });
      });
  }
}

export default Favorite;
