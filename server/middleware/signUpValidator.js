import models from '../models';

const Users = models.users;
/**
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @return { message } message
 */
const signUpUser = (req, res, next) => {
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
  Users.findOne({
    where: {
      $or: [
        {
          email
        },
        {
          userName
        }
      ]
    },
  }).then((user) => {
    if (user) {
      return res.status(400).send({
        message: 'User already exists. Try a different email and/or username.'
      });
    }
  })
    .catch((err) => {
      res.status(500).send({ error: err });
    });

  next();
};

export default signUpUser;
