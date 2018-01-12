import express from 'express';
import { User } from '../controller/user';
import validateInput from '../shared/validations/signup';
import signUpValidator from '../middleware/signUpValidator';
import signInValidator from '../middleware/signInValidator';
import checkUserExists from '../middleware/checkUserExists';

const router = express.Router();

const userRoutes = (router) => {
  router.get('/users', User.getAllUsers);
  router.get('/users/:id', User.getOneUser);
  router.post('/users/signup', signUpValidator, checkUserExists, User.signUpUser);
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
