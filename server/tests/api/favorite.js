import chai from 'chai';
import expect from 'expect';
import chaiHttp from 'chai-http';
import app from '../../app';


chai.use(chaiHttp);

describe('More Recipes', () => {
  it('should successfully favorite a recipe and return 200', (done) => {
    chai.request(app)
      .post('/api/v1/favorites').set({ authorization: token })
      .send({
        recipeId: 1,
        userId: 3
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.foundRecipe).toEqual();
        done();
      });
  });

  it('should throw an error if recipe has been favorited and return 200', (done) => {
    chai.request(app)
      .post('/api/v1/favorites').set({ authorization: token })
      .send({
        userId: 1,
        recipeId: 1,
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('You have already favorited this recipe');
        done();
      });
  });

  it('should throw an error if invalid details and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/favorites').set({ authorization: token })
      .send({
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('All fields must be provided!');
        done();
      });
  });

  it('should throw an error if invalid userId and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/favorites').set({ authorization: token })
      .send({
        recipeId: 1000,
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter a valid userid ');
        done();
      });
  });

  it('should throw an error if invalid recipeId and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/favorites').set({ authorization: token })
      .send({
        userId: 1,
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter a valid recipeid ');
        done();
      });
  });

  it('should get all favorited recipe return 200', (done) => {
    chai.request(app)
      .get('/api/v1/users/:id/recipes').set({ authorization: token })
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.favorites).toEqual();
        done();
      });
  });
});
