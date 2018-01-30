'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe('More Recipes', function () {
  xit('should successfully favorite a recipe and return 200', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/favorites').set({ authorization: _jsonwebtoken2.default }).send({
      userId: 3,
      recipeId: 1
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(200);
      (0, _expect2.default)(res.body.foundRecipe).toEqual();
      done();
    });
  });

  xit('should throw an error if recipe has been favorited and return 200', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/favorites').set({ authorization: _jsonwebtoken2.default }).send({
      userId: 1,
      recipeId: 1
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(200);
      (0, _expect2.default)(res.body.message).toEqual('You have already favorited this recipe');
      done();
    });
  });

  xit('should throw an error if invalid details and return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/favorites').set({ authorization: _jsonwebtoken2.default }).send({}).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('All fields must be provided!');
      done();
    });
  });

  xit('should throw an error if invalid userId and return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/favorites').set({ authorization: _jsonwebtoken2.default }).send({
      recipeId: 1000
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Please enter a valid userid ');
      done();
    });
  });

  xit('should throw an error if invalid recipeId and return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/favorites').set({ authorization: _jsonwebtoken2.default }).send({
      userId: 1
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Please enter a valid recipeid ');
      done();
    });
  });

  xit('should get all favorited recipe return 200', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/users/:id/recipes').set({ authorization: _jsonwebtoken2.default }).send({}).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(200);
      (0, _expect2.default)(res.body.favorites).toEqual();
      done();
    });
  });
});