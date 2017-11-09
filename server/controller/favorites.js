import models from '../models';

const Favorites = models.favorites;

class Favorite {
  /**
   * 
   * 
   * @static
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Favorite
   */
  static makeFavorite(req, res) {
    const{userid, recipeid} = req.body;
    if (recipeid && userid && recipeid !== '' && userid !== '') {
      return Favorites
        .findAll({
          where: {
            recipeid,
            userid
          },
        })
        .then(favorited => {
          if (favorited.length >= 1) {
            return res.status(200).send({
              message: 'You have already favorited this recipe'
            });
          }

          Favorites.create({
            userid,
            recipeid,
          }).then(favorited => {
            return res.status(200).send(favorited);
          })
            .catch(err => {
              res.status(500).send({err});
            });
        })
        .catch(err => {
          res.status(500).send({err});
        });
    } else{
      res.status(400).send({
        message: 'Please enter a valid user id / recipe id'
      });
    }
  }

  static getFavorites(req, res) {
    return Favorites.all()
      .then(favorites => {
        res.status(200).send({favorites});
      })
      .catch(err => {
        res.status(500).send({err});
      });
  }
}

export default Favorite;
