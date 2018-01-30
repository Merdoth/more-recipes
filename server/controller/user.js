// import modules
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models/';
import generateToken from '../utils/token';

// create reference to db model
const Users = models.users;
const Favorites = models.favorites;

/**
 * @class
 */
class User {
  /**
   * @description creates a new user controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static signUpUser(req, res) {
    Users.create(req.body)
      .then((userCreated) => {
        const newUser = userCreated.dataValues;
        const token = generateToken(newUser);
        return res.status(201).send({
          message: 'User successfully created',
          user: {
            userName: newUser.userName,
            email: newUser.email,
            token
          }
        });
      })
      .catch(err => res.status(400).send({ error: err }));
  }

  /**
   * @description get all users controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static getAllUsers(req, res) {
    Users.findAll({
      include: [{ model: Favorites }],
      attributes: ['userName', 'email']
    })
      .then((users) => {
        res.status(200).send({ users });
      })
      .catch((err) => {
        res.status(404).send({ error: err });
      });
  }

  /**
   * @description get a user controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static getOneUser(req, res) {
    Users.findById(req.params.id, {
      include: [{ model: Favorites }],
      attributes: ['userName', 'email']
    })
      .then((users) => {
        res.status(200).send({ users });
      })
      .catch((err) => {
        res.status(404).send({ error: err });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  }

  /**
   * @description sign in user controller
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  static signInUser(req, res) {
    const { email, password } = req.body;
    Users.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
              { id: user.id, userName: user.userName, email: user.email },
              process.env.SECRET_KEY,
              {
                expiresIn: 60 * 60 * 24 // Token expires in 24 hours
              }
            );

            return res.status(200).send({ message: 'Welcome', token });
          }
          return res.status(400).send({ message: 'Incorrect login details!' });
        }
        return res.status(404).send({ message: 'User does not exist!' });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  }
}

export default User;
