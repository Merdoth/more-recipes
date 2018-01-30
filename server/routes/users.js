import User from '../controller/user';
import { signUpValidator, signInValidator } from '../middleware/validateInput';
import auth from '../middleware/authorization';
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
  router.get('/users/:id', auth.authorize, User.getOneUser);
  router.post(
    '/users/signup',
    signUpValidator,
    checkUserExists,
    User.signUpUser
  );
  router.post('/users/signin', signInValidator, User.signInUser);
};

export default userRoutes;
