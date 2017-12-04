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
  static signUpUser(req, res) {
    // const { email, userName } = req.body;
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
        res.status(500).send({ error: err });
      });
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @return { error } error
   */
  static getOneUser(req, res) {
    Users.findById({
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
  static signInUser(req, res) {
    const { email, password } = req.body;
    Users.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 24 // Token expires in 24 hours
          });

          return res.status(200).send({ message: 'Welcome', token });
        }
        return res.status(404).send({ message: 'Incorrect login details!' });
      }
      return res.status(404).send({ message: 'User does not exist!' });
    });
  }
}

export default User;
