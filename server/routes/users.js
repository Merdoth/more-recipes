import express from 'express';
import { User } from '../controller/user';
import validateInput from '../shared/validations/signup';
import signUpUser from '../middleware/signUpValidator';
import signInValidator from '../middleware/signInValidator';


const router = express.Router();


const userRoutes = (router) => {
  router.get('/users', User.getAllUsers);
  router.get('/users/:id', User.getOneUser);
  router.post('/users/signup', signUpUser, User.signUpUser);
  router.post('/users/signin', signInValidator, User.signInUser);

  router.post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if (isValid) {
      res.send({ success: true });
    } else {
      res.status(400).send(errors);
    }
  });
};

export default userRoutes;
