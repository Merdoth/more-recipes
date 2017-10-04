import express from 'express';
import recipes from '../controller/recipes';

let router = express.Router();

//User route goes here
//router.get('/', user.getAll);
router.post('/', recipes.add);
// router.get('/', recipes.get);
// router.put('/:Id', recipes.update);

export default router;