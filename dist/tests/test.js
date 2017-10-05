'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

describe('More Recipes', function () {
  it('should get the home page', function (done) {
    _chai2.default.request(_app2.default).get('/').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it('should return a 404 if there is a wrong route', function (done) {
    _chai2.default.request(_app2.default).get('/6^6fDF').end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });

  it('should return 201 for creating a recipe', function (done) {
    var recipe = {
      id: 3,
      name: 'Chocolate cake ',
      ingredients: 'Sugar, Milk, Flour, Egg',
      preparation: 'This is a ',
      upVotes: 50,
      downvotes: 8
    };
    _chai2.default.request(_app2.default).post('/api/recipes').send(recipe).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it('should return 400 for incomplete data', function (done) {
    var recipe = {
      id: 3,
      name: '',
      ingredients: 'Sugar, Milk',
      method: 'Please stir till it becomes solid',
      upVotes: 6
    };
    _chai2.default.request(_app2.default).post('/api/recipes').send(recipe).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Enter Recipe Name');
      done();
    });
  });

  it('should modify a recipe', function (done) {
    var recipe = {
      id: 3,
      name: 'Cheese cake',
      ingredients: 'Sugar, Milk',
      method: 'Please stir till it becomes solid',
      upVotes: 6
    };
    _chai2.default.request(_app2.default).put('/api/recipes/3')
    // .send(recipe)   
    .end(function (err, res) {
      res.body.should.have.status(200);
      done();
    });
  });

  it('should delete a recipe', function (done) {
    _chai2.default.request(_app2.default).delete('/api/recipes/3')
    // .send(recipe)   
    .end(function (err, res) {
      res.should.have.status(204);
      res.body.should.have.property('message').eql('Recipe has been Deleted');

      done();
    });
  });

  it('should return a 404 if no recipe', function (done) {
    _chai2.default.request(_app2.default).delete('/api/recipes/15')
    // .send(recipe)   
    .end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Recipe Not Found');
      done();
    });
  });

  it('should get all recipes', function (done) {
    _chai2.default.request(_app2.default).get('/api/recipes')
    // .send(recipe)   
    .end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message').eql('Welcome to More-Recipes Application, these are the recipes available');
      done();
    });
  });

  it('shoud get recipes by id', function (done) {
    _chai2.default.request(_app2.default).get('/api/recipes/45')
    // .send(recipe)   
    .end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Enter a Recipe');
      done();
    });
  });

  it('shoud post reviews', function (done) {
    _chai2.default.request(_app2.default).post('/api/recipes/2/reviews')
    // .send(recipe)   
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});