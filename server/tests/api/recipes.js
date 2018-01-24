import chai from 'chai';
import expect from 'expect';
import chaiHttp from 'chai-http';
import token from 'jsonwebtoken';

import app from '../../app';


chai.use(chaiHttp);

describe('More Recipes', () => {
  it('should throw an error if recipeName is empty and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set({ authorization: token })
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter a valid recipename!');
        done();
      });
  });

  it('should throw an error if ingredients is empty and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set({ authorization: token })
      .send({
        recipeName: 'ofada rice'
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter valid ingredients!');
        done();
      });
  });

  it('should throw an error if preparation is empty and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set({ authorization: token })
      .send({
        recipeName: 'ofada rice',
        ingredients: 'ede leaf, komo, beans, rice'
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter valid preparation!');
        done();
      });
  });

  it('should successfully create a recipe and return 200', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set({ authorization: token })
      .send({
        recipeName: 'ofada rice',
        ingredients: 'ede leaf, komo, beans, rice',
        preparation: 'but pepper add salt and bake'
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.recipe)
          .toEqual();
        done();
      });
  });

  it('should throw an error if no recipe is found and return 404', (done) => {
    chai.request(app)
      .get('/api/v1/recipes').set({ authorization: token })
      .send({
      })
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message)
          .toEqual('No recipes found. Please try to create some.');
        done();
      });
  });

  it('should throw an error if no recipe is found and return 404', (done) => {
    chai.request(app)
      .get('/api/v1/recipes').set({ authorization: token })
      .send({
      })
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('Recipe not found.');
        done();
      });
  });

  it(
    'should throw an error if one field of a recipe is missing and return 400',
    (done) => {
      chai.request(app)
        .post('/api/v1/recipes').set({ authorization: token })
        .send({
        })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('All fields must be provided!');
          done();
        });
    }
  );
});
