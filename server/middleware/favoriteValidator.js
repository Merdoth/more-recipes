import models from '../models';

const Favorites = models.favorites;

const alreadyFavorited = (req, res, next) => {
  const { userId, recipeId } = req.body;

  if (!recipeId || recipeId.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid recipeid!' });
  }

  if (!userId || userId.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid userid!' });
  }

  if (!recipeId && !userId) {
    return res.status(400).send({ message: 'All fields must be provided!' });
  }

  Favorites
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
    }).catch((err) => {
      res.status(500).send({ err });
    });
  next();
};

export default alreadyFavorited;
