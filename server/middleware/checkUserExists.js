// import models from model directory
import models from '../models';

const Users = models.users;

/**
 * @description checks if user exists
 *
 * @method
 *
 * @param {Object} req - Request object
 *
 * @param {Object} res - Response object
 *
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */
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
    }
  })
    .then((user) => {
      if (user) {
        return res.status(409).send({
          message: 'User already exists. Try a different email and/or username.'
        });
      }
      next();
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    });
};

export default checkUserExists;
