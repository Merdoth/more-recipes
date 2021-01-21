import User from '../controller /User';
import auth from '../middleware/authorization';
import {
  signInValidator,
} from '../validations/validateInput';
import checkUserExists from '../middleware/checkUserExists';

/**
 * @description user routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const userRoutes = (router) => {
  router.get('/users', auth.authorize, User.getAllUsers);
  router.get('/user', auth.authorize, User.getOneUser);
  router.put('/update', auth.authorize, User.updateUserProfile);
  router.post(
    '/users/signup',
    checkUserExists,
    User.signUpUser
  );
  router.post('/users/signin', signInValidator, User.signInUser);
};

export default userRoutes;
