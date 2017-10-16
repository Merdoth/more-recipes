import User from '../controller/user';

const userRoutes = (router) => {
  router.get('/users/', User.getAllUsers);
  router.post('/users/signup', User.signUp);
  router.post('/users/signin', User.signIn);
};

export default userRoutes;