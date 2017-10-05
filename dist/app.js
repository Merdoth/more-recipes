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

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _recipes = require('./routes/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _reviews = require('./routes/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();
var port = process.env.PORT || 5001;
//process.env.SECRET;

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use('/api/v1/recipes', _recipes2.default);
app.use('/api/v1/users', _users2.default);
app.use('/api/v1/reviews', _reviews2.default);

app.get('/', function (req, res) {
  res.status(200).send({
    Message: 'Welcome to more Recipes!'
  });
});

_models2.default.sequelize.authenticate().then(function () {
  app.listen(port, function (err) {
    if (!err) {
      console.log('listening on port localhost://' + port);
    }
  });
  console.log('Datbase Connection established');
}).catch(function (err) {
  console.log('Could not establish a database connection', err);
});

exports.default = app;