'use strict';

require('dotenv').config();

var env = process.env.NODE_ENV || 'development';
var dialect = 'postgres';
var url = '' + process.env.DATABASE_URL + process.env.NODE_ENV;
var devMode = env === ('development' || 'test');
var config = {
  url: url,
  dialect: dialect,
  logging: devMode ? function (log) {
    return log;
  } : false,
  dialectOptions: {
    multipleStatements: true
  }
};

// if (!devMode) {
//   config.ssl = true;
//   config.dialectOptions.ssl = {
//     require: !devMode
//   };
// }

module.exports = config;