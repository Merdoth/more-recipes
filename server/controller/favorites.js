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
            return res.status(409).json({
              succes: false,
              message: 'You already favourited this recipe'
            });
          }
          Favourites.create(recipeData)
            .then((favourite) => {
              if (favourite) {
                res.status(201).json({
                  succes: true,
                  favourite
                });
              }
            })
            .catch((err) => {
              res.status(500).json({
                succes: false,
                message: err.message
              });
            });
        });
      } else {
        return res.status(400).json({
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
                  res.status(200).json({
                    succes: true,
                    message: 'Favourite recipe removed',
                  });
                }
              })
              .catch((err) => {
                res.status(500).json({
                  succes: false,
                  message: err.message
                });
              });
          } else {
            res.status(401).json({
              message: 'You dont have this recipe as a favourite'
            });
          }
        });
      } else {
        return res.status(404).json({
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
          res.status(200).json({
            favourites
          });
        } else {
          res.status(404).json({
            message: 'No favourite recipe found!!',
          });
        }
      })
      .catch((error) => {
        const { message } = error;
        res.status(500).json({
          message
        });
      });
  }
}

export default Favorite;
