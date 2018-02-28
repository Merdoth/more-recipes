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
        if (err) {
          return done(err);
        }
        token = res.body.token;
        done();
      });
  });

  it('should successfully add a review and return 201', (done) => {
    chai
      .request(app)
      .post('/api/v1/recipes/1/reviews')
      .set('authorization', token)
      .send({
        review: 'This recipe is wack!'
      })
      .end((err, res) => {
        expect(res.status).toEqual(201);
        expect(res.body.message).toEqual('Review successfully added');
        expect(res.body.reviewReturned.id).toEqual(1);
        done();
      });
  });

  it(`should return 409 status, a message and an object if the review
  content already exists`, (done) => {
      chai
        .request(app)
        .post('/api/v1/recipes/1/reviews')
        .set('authorization', token)
        .send({
          review: 'This recipe is wack!'
        })
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.message)
            .toEqual('Your already have a review with the same content');
          done();
        });
    });

  it(`should throw an error if recipe
   Id does not exist and return 404`, (done) => {
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
});
