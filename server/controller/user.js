import models from '../models/';
import generateToken from '../utils/token';

const Users = models.users;

export class User {
  static signup(req, res) {
    Users.create(req.body)
      .then((user) => {
        const newUser = user.dataValues;
        newUser.token = generateToken(newUser); 
        res.status(201).send({ message: 'User successfully created', data: newUser });
      })
      .catch(err => {
        // if (/unique violation/.test(err.errors[0].type)) {
        // return res.status(409).send({ error: 'User with the same email or surname already exists' });
        // }
        res.status(400).send({ error: err.errors[0].message });
      });
  }

  static signin(req, res) {
    return { req, res };
  }

  // static signIn(req, res) {
  //   // check db user is in db
  //   const email = req.body.email;
  //   // const password = req.body.password;
  //   Users.findOne({
  //     where:{
  //       email: email
  //     }
  //   }).then(found => {
  //     //console.log(found.password)
  //     if (!found) {
  //       // return 404 if not
  //       return res.status(404).send({message: 'error'});

  //     } else if(bcrypt.compareSync(req.body.password, found.password)) {
  //       // check if password matches
  //       // else create token and send succes message
  //       const token = jwt.sign({id: found.id}, process.env.SECRET_KEY, {
  //         expiresIn: 60 * 60 * 24 // Token expires in 24 hours
  //       });
  //       return res.status(200).send({message: 'Welcome', token});

  //     } else {
  //       // return 404 if not
  //       return res.status(404).send({
  //         message: 'wrong password'
  //       });
  //     }
  //   });
}

export default User;