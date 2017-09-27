import express from 'express';
import recipeController from '../controller/recipes';

let router = express.Router();

router.get('/', recipeController.test);

export default router;