import express from 'express';
import recipeController from '../controller/recipes';

let router = express.Router();

router.get('/', recipeController.test);
router.get('/add', recipeController.add);

export default router;