import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);

describe('More Recipes', () => {
  it('should get the home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return a 404 if there is a wrong route', (done) => {
    chai.request(app)
      .get('/6^6fDF')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
