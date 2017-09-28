'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _recipes = require('./routes/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/api/recipes', _recipes2.default);

app.get('/', function (req, res) {
  res.status(200).send({
    Message: 'Welcome to more Recipes!'
  });
});

app.use(function (req, res, next) {
  var err = res.status(404).send({
    ERROR: '404: Sorry Page Not Found!'
  });
  next(err);
});

exports.default = app;