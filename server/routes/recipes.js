import express from 'express';
import recipes from '../controller/recipes';

let router = express.Router();

//User route goes here

router.post('/', recipes.add);
router.get('/', recipes.get);
router.put('/:id', recipes.update);
router.delete('/:id', recipes.delete);

export default router;