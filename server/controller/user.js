import bcrypt from 'bcrypt';
import models from '../models/';
import Token from '../utils/token';

const Users = models.users;

export class User {
  static signUp(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    Users.findOne({
      where: {
        username: username
      }})
      .then(found => {
        if(found) {
          return res.status(400).send({ message: 'Username already exists'});
        } else {
          return Users
            .create({
              username: username,
              email: email,
              password: password
            }) .then(created => {
              return res.status(201).send({ message: 'User created', created});
            })
            .catch(error => res.status(400).send({message: 'errrrr'}));
        }
      });
    
  }
}

export default User;