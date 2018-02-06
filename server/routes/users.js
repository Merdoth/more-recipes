import User from '../controller/user';
import auth from '../middleware/authorization';
import {
  signInValidator,
  signUpValidator
} from '../middleware/validateInput';
import checkUserExists from '../middleware/checkUserExists';

/**
 * @description user routes
 *
 * @param {Function} router
 *
 * @returns {void}
 */
const userRoutes = (router) => {
  router.get('/users', User.getAllUsers);
  router.get('/users/:id', signUpValidator, auth.authorize, User.getOneUser);
  router.post(
    '/users/signup',
    signInValidator,
    checkUserExists,
    User.signUpUser
  );
  router.post('/users/signin', User.signInUser);
};

export default userRoutes;
