'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dotenv.config();

var db = {};
var sequelize = new _sequelize2.default(_config2.default.url, _config2.default);

_fs2.default.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== 'index.js';
}).forEach(function (file) {
  var model = sequelize.import('./' + file);
  db[model.name] = model;
});

Object.keys(db).forEach(function (key) {
  var model = db[key];
  if ('associate' in model) model.associate(db);
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

exports.default = db;