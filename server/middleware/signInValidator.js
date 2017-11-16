/**
 *
 * @param { req } req
 * @param { res } res
 * @param { next } next
 * @return { message } message
 */
export default function (req, res, next) {
  const { email, password } = req.body;

  if (!email || email.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid email!' });
  }
  if (!password || password.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid password!' });
  }
  next();
}
