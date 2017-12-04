import models from '../models';

const Users = models.users;

const checkUserExists = (req, res, next) => {
  const { userName, email } = req.body;
  return Users.findOne({
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
  });
  // .catch((err) => {
  //   res.status(500).send({ error: err });
  // });
  next();
};

export default checkUserExists;
