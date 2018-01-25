import { User } from '../controller/user';
import signUpValidator from '../middleware/signUpValidator';
import auth from '../middleware/authorization';
import signInValidator from '../middleware/signInValidator';
import checkUserExists from '../middleware/checkUserExists';

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
