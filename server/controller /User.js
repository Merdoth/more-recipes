import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models/';
import generateToken from '../utils/token';
import validateInput, { validateUpdateUserInput } from '../validations/validateInput';

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
    const { errors, isValid } = validateInput(req.body);
    if (!isValid) {
      return res.status(400).send({ error: errors });
    }

    Users.create(req.body)
      .then((userCreated) => {
        const newUser = userCreated.dataValues;
        const token = generateToken(newUser);
        return res.status(201).send({
          message: 'User successfully created',
          user: {
            fullName: newUser.fullName,
            userName: newUser.userName,
            email: newUser.email,
            token
          }
        });
      })
      .catch(err => res.status(400).send({ error: err }));
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
              {
                id: user.id,
                email: user.email
              },
              process.env.SECRET_KEY,
              {
                expiresIn: 60 * 60 * 24
              }
            );
            return res.status(200).send({
              message: 'Welcome!',
              token
            });
          } else {
            return res.status(400)
              .send({ message: 'Incorrect login details!' });
          }
        }
        return res.status(404).send({ message: 'User does not exist!' });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
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
        if (users.length === 0) {
          return res.status(404).send({
            message: 'Users not found',
          });
        }
        return res.status(200).send({ users });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
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
    Users.findById(req.decoded.id, {
      include: [{ model: Favorites }],
      attributes: ['fullName', 'userName', 'email']
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'No user was found',
          });
        }
        res.status(200).send({ user });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  }

  /**
  *  @description Updates a User's Profile
  *
  * @param {Object} req - req object
  * @param {Object} res - res object
  *
  * @returns {Object} res object
  */
  static updateUserProfile(req, res) {
    const { errors, isValid } = validateUpdateUserInput(req.body);
    if (!isValid) {
      return res.status(400).send({ error: errors });
    }
    Users.findById(req.decoded.id)
      .then((userFound) => {
        if (userFound) {
          const {
            fullName,
            userName,
            email
          } = req.body;
          userFound.update({ fullName, userName, email })
            .then((updatedUser) => {
              if (!updatedUser) {
                return res.status(400).send({ error: errors });
              }
              if (updatedUser) {
                const payload = {
                  id: updatedUser.id,
                  fullName: updatedUser.dataValues.fullName
                };
                const token = generateToken(payload);
                res.status(200).send({
                  status: 'Successful',
                  message: 'Your account has been updated',
                  token,
                  user: {
                    fullName: updatedUser.dataValues.fullName,
                    userName: updatedUser.dataValues.userName,
                    email: updatedUser.dataValues.email,
                  },
                });
              }
            });
        }
      })
      .catch(() => res.status(500).send({
        message: 'No user found'
      }));
  }
}

export default User;
