'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _recipes = require('../controller/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//User route goes here

router.post('/', _recipes2.default.add);
router.get('/', _recipes2.default.get);
router.put('/:Id', _recipes2.default.update);

exports.default = router;