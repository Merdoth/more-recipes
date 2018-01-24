'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe('More Recipes', function () {
  it('should throw an error if userName is empty & return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({}).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Please enter a valid userName!');
    });
    done();
  });

  it('should throw an error if email is empty & return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      userName: 'ucheya'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Please enter a valid email!');
    });
    done();
  });

  it('should throw an error if password is empty & return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      userName: 'ucheya',
      email: 'ucheya@gmail.com'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Please enter a valid password!');
    });
    done();
  });

  it('should throw an error if password is less than 8 characters & return 400 ', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      userName: 'ucheya',
      email: 'ucheya@gmail.com',
      password: '1234567'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Password must be up to 8 characters!');
    });
    done();
  });

  it('should successfully signup a user and return 201', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      userName: 'ucheya',
      email: 'ucheya@gmail.com',
      password: '12345678'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(201);
      (0, _expect2.default)(res.body.message).toEqual('User successfully created');
    });
    done();
  });

  it('should throw an error if email is empty and return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({}).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Please enter a valid email!');
    });
    done();
  });

  it('should throw an error if password is empty and return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      email: 'ucheya@gmail.com'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Please enter a valid password!');
    });
    done();
  });

  it('should throw an error if password is invalid and return 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      email: 'ucheya@gmail.com',
      password: '1234567'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(400);
      (0, _expect2.default)(res.body.message).toEqual('Invalid password!');
    });
    done();
  });

  it('should throw an error if user uses incorrect details and return 404', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      email: 'ucheya@gmail.com',
      password: '123456789'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(404);
      (0, _expect2.default)(res.body.message).toEqual('Incorrect login details!');
    });
    done();
  });

  it('should throw an error if user uses incorrect details and return 404', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      email: 'ucheyao@gmail.com',
      password: '12345679'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(404);
      (0, _expect2.default)(res.body.message).toEqual('Incorrect login details!');
    });
    done();
  });

  it('should successfully log user in and return 200', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      email: 'ucheya@gmail.com',
      password: '12345678'
    }).end(function (err, res) {
      (0, _expect2.default)(res.status).toEqual(200);
      (0, _expect2.default)(res.body.message).toEqual('Welcome!');
    });
    done();
  });
});