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
  it('should throw an error if recipeName is empty and return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set({ authorization: _jsonwebtoken2.default }).send({}).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Please enter a valid recipename!');
      done();
    });
  });

  it('should throw an error if ingredients is empty and return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set({ authorization: _jsonwebtoken2.default }).send({
      recipeName: 'ofada rice'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Please enter valid ingredients!');
      done();
    });
  });

  it('should throw an error if preparation is empty and return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set({ authorization: _jsonwebtoken2.default }).send({
      recipeName: 'ofada rice',
      ingredients: 'ede leaf, komo, beans, rice'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Please enter valid preparation!');
      done();
    });
  });

  it('should successfully create a recipe and return 200', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set({ authorization: _jsonwebtoken2.default }).send({
      recipeName: 'ofada rice',
      ingredients: 'ede leaf, komo, beans, rice',
      preparation: 'but pepper add salt and bake'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(200);
      (0, _expect2.default)(res.body.recipe).toEqual();
      done();
    });
  });

  it('should throw an error if no recipe is found and return 404', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/recipes').set({ authorization: _jsonwebtoken2.default }).send({}).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(404);
      (0, _expect2.default)(res.body.message).toEqual('No recipes found. Please try to create some.');
      done();
    });
  });

  it('should throw an error if no recipe is found and return 404', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/recipes').set({ authorization: _jsonwebtoken2.default }).send({}).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(404);
      (0, _expect2.default)(res.body.message).toEqual('Recipe not found.');
      done();
    });
  });

  it('should throw an error if one field of a recipe is missing and return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set({ authorization: _jsonwebtoken2.default }).send({}).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('All fields must be provided!');
      done();
    });
  });
});