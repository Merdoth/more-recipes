import chai from 'chai';
import expect from 'expect';
import chaiHttp from 'chai-http';
import { user1 } from '../helpers/userHelper';
import app from '../../app';

chai.use(chaiHttp);

let token;

describe('More Recipes', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(user1)
      .end((err, res) => {
        token = res.body.token;
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Welcome!', token);
        done();
      });
  });

  it('should successfully add a review and return 200', (done) => {
    chai
      .request(app)
      .post('/api/v1/recipes/1/reviews')
      .set('authorization', token)
      .send({
        review: 'This recipe is wack!'
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Review successfully added');
        done();
      });
  });

  it('should throw an error if the review already exists and return 409', (done) => {
    chai
      .request(app)
      .post('/api/v1/recipes/1/reviews')
      .set('authorization', token)
      .send({
        review: 'This recipe is wack!'
      })
      .end((err, res) => {
        expect(res.status).toEqual(409);
        expect(res.body.message).toEqual('Your already have a review with same review');
        done();
      });
  });

  it('should throw an error if recipe Id does not exist and return 404', (done) => {
    chai
      .request(app)
      .post('/api/v1/recipes/5/reviews')
      .set('authorization', token)
      .send({
        review: 'This recipe is wack!'
      })
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('No recipe with ID 5');
        done();
      });
  });

  it('should throw an error if no recipe is found and return 404', (done) => {
    chai
      .request(app)
      .get('/api/v1/recipes/5/reviews')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('Recipe not found');
        done();
      });
  });

  it('should successfully get a recipe reviews and return 200', (done) => {
    chai
      .request(app)
      .get('/api/v1/recipes/1/reviews')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  });
});
