import User from '../controller/user';
import Validator from 'validator';
import express from 'express';
import isEmpty from 'loadash/isEmpty';


let router = express.Router();

function validateInput(data) {
  let errors = {};

  if(Validator.isNull(data.username)) {
    errors.username ='This field is required';
  }
  if(Validator.isNull(data.email)) {
    errors.email ='This field is required';
  }
  if(!Validator.isEmail(data.email)) {
    errors.email ='Email is invalid';
  }
  if(Validator.isNull(data.password)) {
    errors.password ='This field is required';
  }
  if(Validator.isNull(data.confirmPassword)) {
    errors.confirmPassword ='This field is required';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

const userRoutes = (router) => {
  router .get('/users/', User.getAllUsers);
  router.post('/users/signup', User.signUp);
  router.post('/users/signin', User.signIn);

  router.post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body);
  
    if (!isValid) {
      res.status(400).send(errors);
    }
  });
};

export default userRoutes;