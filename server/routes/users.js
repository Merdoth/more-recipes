import express from 'express';
import user from '../controller/user';

let router = express.Router();

//User route goes here
//router.get('/', user.getAll);
router.post('/signUp', user.signUp);
router.post('/signIn', user.signIn);

export default router;