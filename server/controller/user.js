import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models/';
import generateToken from '../utils/token';


const Users = models.users;
const { Favorites } = models.favorites;

/**
 * @class
 */
export class User {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { message } message
   */
  static signUp(req, res) {
    const { email, userName } = req.body;
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
    });
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { error } error
   */
  static getAllUsers(req, res) {
    Users.findAll({
      include: [{ model: Favorites }]
    })
      .then((users) => {
        res.status(200).send({ users });
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { error } error
   */
  static getOneUser(req, res) {
    Users.find({
      include: [{ model: Favorites }]
    })
      .then((users) => {
        res.status(200).send({ users });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { message } message
   */
  static signIn(req, res) {
    const { email } = req.body.email;
    Users.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 24 // Token expires in 24 hours
          });

          return res.status(200).send({ message: 'Welcome', token });
        }
        return res.status(404).send({ message: 'Incorrect login details!' });
      }
      // return res.status(404).send({ message: 'User does not exist!' });
    });
  }
}

export default User;
