/**
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @return { message } message
 */
export default function (req, res, next) {
  const { userName, email, password } = req.body;

  if (!userName || userName.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid userName!' });
  }
  if (!email || email.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid email!' });
  }
  if (!password || password.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid password!' });
  }
  if (password.length < 8) {
    return res.status(400).send({
      message:
        'Password must be up to 8 characters!'
    });
  }
  next();
}
