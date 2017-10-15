import models from '../models/';
import generateToken from '../utils/token';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Users = models.users;
const Favorites = models.favorites;

export class User {
  static signUp(req, res) {
    Users.create(req.body)
      .then((user) => {
        const newUser = user.dataValues;
        newUser.token = generateToken(newUser); 
        res.status(201).send({ message: 'User successfully created', data: newUser });
      })
      .catch(err => {
        res.status(400).send({ error: err });
      });
  }

  static getAllUsers(req, res) {
    Users.findAll({
      include:[{ model: Favorites }]
    })
      .then((users) => {
        res.status(200).send({ users });
      })
      .catch(err => {
        res.status(400).send({ error: err });
      });
  }

  static signIn(req, res) {
    // check db user is in db
    const email = req.body.email;
    // const password = req.body.password;
    Users.findOne({
      where:{
        email
      }
    }).then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({id: user.id}, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 // Token expires in 24 hours
          });
  
          return res.status(200).send({message: 'Welcome', token}); 
        } else {
          return res.status(400).send({message: 'Incorrect login details!'});
        } 
      } else {
        return res.status(404).send({message: 'User does not exist!'});
      }
    });
  }
}

export default User;