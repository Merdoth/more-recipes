import bcrypt from 'bcrypt';
import models from '../models/';
import jwt from 'jsonwebtoken';

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
          return res.status(409).send({ message: 'Username already exists'});
        } else {
          return Users
            .create({
              username: username,
              email: email,
              password: hashedPassword
            }) .then(created => {
              return res.status(201).send({ message: 'User created', created});
            })
            .catch(error => res.status(400).send({message: 'errrrr'}));
        }
      });
    
  }
  static signIn(req, res) {
    // check db user is in db
    const email = req.body.email;
    // const password = req.body.password;
    Users.findOne({
      where:{
        email: email
      }
    }).then(found => {
      //console.log(found.password)
      if (!found) {
        // return 404 if not
        return res.status(404).send({message: 'error'});

      } else if(bcrypt.compareSync(req.body.password, found.password)) {
        // check if password matches
        // else create token and send succes message
        const token = jwt.sign({id: found.id}, process.env.SECRET_KEY, {
          expiresIn: 60 * 60 * 24 // Token expires in 24 hours
        });
        return res.status(200).send({message: 'Welcome', token});

      } else {
        // return 404 if not
        return res.status(404).send({
          message: 'wrong password'
        });
      }
    });
    
   
   
   
  }
}

export default User;