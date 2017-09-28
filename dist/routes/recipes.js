'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _recipes = require('../controller/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _review = require('../controller/review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recipeController = new _recipes2.default();
var reviewController = new _review2.default();

var router = _express2.default.Router();

router.post('/', recipeController.add);
router.put('/:Id', recipeController.update);
router.delete('/:Id', recipeController.delete);
router.get('/', recipeController.get);
router.post('/:Id/reviews', reviewController.add);

exports.default = router;