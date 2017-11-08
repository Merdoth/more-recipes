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

var _routes = require('./routes/');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();
var router = _express2.default.Router();
var port = process.env.PORT || 9000;

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

(0, _routes2.default)(router);
app.use('/api/v1', router);

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