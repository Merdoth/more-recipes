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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _routes = require('./routes/');

var _routes2 = _interopRequireDefault(_routes);

var _webpackConfig = require('../webpack.config.dev');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var indexPath = process.env.NODE_ENV === 'production' ? 'dist' : 'client';

var app = (0, _express2.default)();
var router = _express2.default.Router();
var port = process.env.PORT || 9000;
var compiler = (0, _webpack2.default)(_webpackConfig2.default);

app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.static(_path2.default.join(__dirname, './../assets')));
if (process.env.NODE_ENV !== 'development') {
  app.use(_express2.default.static(_path2.default.join(__dirname, './../dist')));
}

if (process.env.NODE_ENV === 'production') {
  console.log('production');
}
if (process.env.NODE_ENV === 'development') {
  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    hot: true,
    publicPath: _webpackConfig2.default.output.publicPath,
    noInfo: true
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use((0, _expressValidator2.default)());

(0, _routes2.default)(router);

app.use('/api/v1', router);

app.use('*', function (req, res) {
  res.status(200).sendFile(_path2.default.join(__dirname, '../' + indexPath + '/index.html'));
});

_models2.default.sequelize.authenticate().then(function () {
  app.listen(port, function (err) {
    if (!err) {
      console.log('listening on port localhost:' + port);
    }
  });
  console.log('Datbase Connection established');
}).catch(function (err) {
  console.log('Could not establish a database connection', err);
});

exports.default = app;