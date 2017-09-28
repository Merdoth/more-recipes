import express from 'express';
import Recipes from '../controller/recipes';
import Review from '../controller/review';

const recipeController = new Recipes();
const reviewController = new Review();

let router = express.Router();

router.post('/', recipeController.add);
router.put('/:Id', recipeController.update);
router.delete('/:Id', recipeController.delete);
router.get('/', recipeController.get);
router.post('/:Id/reviews', reviewController.add);

export default router;