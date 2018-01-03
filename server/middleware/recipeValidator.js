
/**
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @return { message } message
 */
export default function (req, res, next) {
  const { recipeName, ingredients, preparation } = req.body;

  if (!recipeName || recipeName.trim() === '') {
    return res.status(400).send({
      message: 'Please enter a valid recipename!'
    });
  }
  if (!ingredients || ingredients.trim() === '') {
    return res.status(400).send({
      message: 'Please enter valid ingredients!'
    });
  }
  if (!preparation || preparation.trim() === '') {
    return res.status(400).send({ message: 'Please enter valid preparation!' });
  }
  next();
}
