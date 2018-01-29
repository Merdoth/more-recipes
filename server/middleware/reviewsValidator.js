const alreadyReviewed = (req, res, next) => {
  const recipeId = Number(req.params.recipeId);
  const { review } = req.body;
  console.log(req.body, 'req.bosy')

  if (!recipeId) {
    return res.status(404).send({ message: 'Please enter a valid recipeid!' });
  }

  if (!review || review.trim() === '') {
    return res.status(404).send({ message: 'Please enter a review!' });
  }
  next();
};

export default alreadyReviewed;
