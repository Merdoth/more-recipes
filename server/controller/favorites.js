import models from '../models';

const Favorites = models.favorites;
/**
 * @class
 */
class Favorite {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @return {favorite} favorite
   */
  static addFavorite(req, res) {
    const { userId, recipeId } = req.body;
    Favorites.create({
      userId,
      recipeId,
    }).then(foundRecipe => res.status(200).send(foundRecipe))
      .catch((err) => {
        res.status(404).send({ err });
      });
  }

  /**
 *
 * @param {req} req
 * @param {res} res
 * @return {favorites} favorites
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
