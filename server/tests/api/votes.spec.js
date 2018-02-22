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


  it('should successfully add an upvote and return 201', (done) => {
    chai
      .request(app)
      .post('/api/v1/votes/1/upvotes')
      .set('authorization', token)
      .send({
        upVotes: '1'
      })
      .end((err, res) => {
        expect(res.status).toEqual(201);
        expect(res.body.message).toEqual('Your vote has been recorded');
        done();
      });
  });

  it('should successfully remove upvote and return 200', (done) => {
    chai
      .request(app)
      .post('/api/v1/votes/1/upvotes')
      .set('authorization', token)
      .send({
        upVotes: '0'
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Your upvote has been removed');
        done();
      });
  });

  it('should throw an error if no recipe is found and return 404', (done) => {
    chai
      .request(app)
      .post('/api/v1/votes/5/upvotes')
      .set('authorization', token)
      .send({
      })
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('Recipe not found');
        done();
      });
  });

  it('should successfully add an downvote and return 201', (done) => {
    chai
      .request(app)
      .post('/api/v1/votes/1/downvotes')
      .set('authorization', token)
      .send({
        downVotes: '1'
      })
      .end((err, res) => {
        expect(res.status).toEqual(201);
        expect(res.body.message).toEqual('Your downvote has been recorded');
        done();
      });
  });
  it('should successfully add an upvote and return 200', (done) => {
    chai
      .request(app)
      .post('/api/v1/votes/1/upvotes')
      .set('authorization', token)
      .send({
        upVotes: '1'
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Your vote has been added');
        done();
      });
  });
  it('should create a downvote if there was an upvote and return 200', (done) => {
    chai
      .request(app)
      .post('/api/v1/votes/1/downvotes')
      .set('authorization', token)
      .send({
        downVotes: '1'
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Your vote has been added');
        done();
      });
  });
  it('should successfully remove downvote and return 200', (done) => {
    chai
      .request(app)
      .post('/api/v1/votes/1/downvotes')
      .set('authorization', token)
      .send({
        downVotes: '0'
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Your downvote has been removed');
        done();
      });
  });
});
