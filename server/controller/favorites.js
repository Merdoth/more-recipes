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
  static makeFavorite(req, res) {
    const { userId, recipeId } = req.body;
    if (recipeId && userId && recipeId !== '' && userId !== '') {
      return Favorites
        .findAll({
          where: {
            recipeId,
            userId
          },
        })
        .then((favorited) => {
          if (favorited.length >= 1) {
            return res.status(200).send({
              message: 'You have already favorited this recipe'
            });
          }

          Favorites.create({
            userId,
            recipeId,
          }).then(foundRecipe => res.status(200).send(foundRecipe))
            .catch((err) => {
              res.status(500).send({ err });
            });
        })
        .catch((err) => {
          res.status(500).send({ err });
        });
    }
    res.status(400).send({
      message: 'Please enter a valid user id / recipe id'
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
        res.status(500).send({ err });
      });
  }
}

export default Favorite;
