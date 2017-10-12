import express from 'express';
import User from '../controller/user';

let router = express.Router();

router.post('/signup', User.signup);
router.post('/signin', User.signIn);
router.get('/', User.getAllUsers);

export default router;