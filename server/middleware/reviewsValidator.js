

const alreadyReviewed = (req, res, next) => {
  const { userId, recipeId, review } = req.body;

  if (!userId || userId.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid userid!' });
  }

  if (!recipeId || recipeId.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid recipeid!' });
  }

  if (!review || review.trim() === '') {
    return res.status(400).send({ message: 'Please enter a review!' });
  }
  next();
};

export default alreadyReviewed;
