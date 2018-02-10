// import models from models directory
import models from '../models';

// create reference to database model
const Favourites = models.favorites;
const Recipes = models.recipes;

/**
 * @class
 */
class Favorite {
  /**
   * @description add favourite controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   *
   */
  static addFavourites(req, res) {
    const userId = req.decoded.id;
    const { recipeId } = req.body;
    const recipeData = {
      userId,
      recipeId
    };
    Recipes.findById(recipeId).then((recipe) => {
      if (recipe) {
        Favourites.findOne({
          where: {
            userId,
            recipeId
          }
        }).then((foundFavourite) => {
          if (foundFavourite) {
            return res.status(409).send({
              succes: false,
              message: 'You already favourited this recipe'
            });
          }
          Favourites.create(recipeData)
            .then((favourite) => {
              if (favourite) {
                res.status(201).send({
                  succes: true,
                  favourite
                });
              }
            })
            .catch((err) => {
              res.status(500).send({
                succes: false,
                message: err.message
              });
            });
        });
      } else {
        return res.status(400).send({
          succes: false,
          message: `Recipe with ID ${recipeId} does not exist`
        });
      }
    });
  }

  /**
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Favorite
   * @returns { void }
   */
  static removeFavourites(req, res) {
    const userId = req.decoded.id;
    const { recipeId } = req.params;
    Recipes.findById(recipeId).then((foundRecipe) => {
      if (foundRecipe) {
        Favourites.findOne({ where: { userId, recipeId } }).then((favourite) => {
          if (favourite) {
            Favourites.destroy({
              where: {
                id: favourite.id
              }
            })
              .then((responseData) => {
                if (responseData) {
                  res.status(200).send({
                    succes: true,
                    message: 'Favourite recipe removed',
                  });
                }
              })
              .catch((err) => {
                res.status(500).send({
                  succes: false,
                  message: err.message
                });
              });
          } else {
            res.status(401).send({
              message: 'You dont have this recipe as a favourite'
            });
          }
        });
      } else {
        return res.status(404).send({
          succes: false,
          message: `Recipe with ID ${recipeId} does not exist`
        });
      }
    });
  }

  /**
   *
   * @description get user favourites controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   *
   */
  static getFavorites(req, res) {
    return Favourites.all()
      .then((favorites) => {
        res.status(200).send({ favorites });
      })
      .catch((err) => {
        res.status(404).send({ err });
      });
  }

  /**
   * @description A method to get a single favourite recipe based on user ID and recipe ID
   *
   * @param {object} req object
   * @param {object} res object
   *
   * @returns {object} json - payload
   *
   * @memberof Favourites
   */
  static getUserFavourites(req, res) {
    const userId = req.decoded.id;

    return Favourites
      .findAll({
        where: { userId },
        include: [{ model: Recipes }]
      })
      .then((favourites) => {
        if (favourites.length < 1) {
          return res.status(404).send({
            message: 'No Favourites Found please try to create some'
          });
        }
        if (favourites) {
          return res.status(200).send({ favourites });
        }
      })
      .catch(error => res.status(500).send({ error }));
  }


  /**
   * @description A method to get a single favourite recipe based on user ID and recipe ID
   *
   * @param {object} req object
   *
   * @param {object} res object
   *
   * @returns {object} insertion error messages object or success message object
   *
   * @memberof Favourites
   */
  static getSingleFavourite(req, res) {
    const userId = req.decoded.id;
    const { recipeId } = req.params;

    Favourites.findOne({
      where: { userId, recipeId }
    })
      .then((favourites) => {
        if (favourites) {
          res.status(200).send({
            favourites
          });
        } else {
          res.status(404).send({
            message: 'No favourite recipe found!!',
          });
        }
      })
      .catch((error) => {
        const { message } = error;
        res.status(500).send({
          message
        });
      });
  }
}

export default Favorite;
