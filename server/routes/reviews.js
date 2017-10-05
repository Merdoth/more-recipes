import express from 'express';
import reviews from '../controller/reviews';

let router = express.Router();

//User route goes here

router.post('/', reviews.add);

export default router;