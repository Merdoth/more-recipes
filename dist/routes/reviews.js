'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _reviews = require('../controller/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//User route goes here

router.post('/', _reviews2.default.add);

exports.default = router;