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

  it('should successfully favorite a recipe and return 200', (done) => {
    chai
      .request(app)
      .post('/api/v1/favourites')
      .set('authorization', token)
      .send({
        recipeId: 1
      })
      .end((err, res) => {
        expect(res.status).toEqual(201);
        expect(res.body.foundRecipe).toEqual();
        done();
      });
  });

  it(
    'should throw an error if recipe has been favorited and return 409',
    (done) => {
      chai
        .request(app)
        .post('/api/v1/favourites')
        .set('authorization', token)
        .send({
          recipeId: 1
        })
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.message).toEqual('You already favourited this recipe');
          done();
        });
    }
  );

  it('should throw an error if invalid details and return 400', (done) => {
    chai
      .request(app)
      .post('/api/v1/favourites')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message)
          .toEqual('Recipe with ID undefined does not exist');
        done();
      });
  });

  it('should throw an error if invalid userId and return 400', (done) => {
    chai
      .request(app)
      .post('/api/v1/favourites')
      .set('authorization', token)
      .send({
        recipeId: 1000
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Recipe with ID 1000 does not exist');
        done();
      });
  });

  it('should throw an error if invalid recipeId and return 400', (done) => {
    chai
      .request(app)
      .post('/api/v1/favourites')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Recipe with ID undefined does not exist');
        done();
      });
  });

  it('should get all favourited recipe return 200', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/1/recipes')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  });

  it('should get all users favourited recipes return 200', (done) => {
    chai
      .request(app)
      .get('/api/v1/favourites/1')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  });

  it('should successfully delete a recipe and return 200', (done) => {
    chai.request(app)
      .delete('/api/v1//favourites/1')
      .set({ authorization: token })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Favourite recipe removed');
        done();
      });
  });

  it(`should throw an error if a user trys to delete an
   unfavourited recipe and return 404`, (done) => {
      chai.request(app)
        .delete('/api/v1//favourites/1')
        .set({ authorization: token })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message)
            .toEqual('You dont have this recipe as a favourite');
          done();
        });
    });

  it(`should throw an error if a user trys to 
    delete a recipe that does not exists and return 404`, (done) => {
      chai.request(app)
        .delete('/api/v1//favourites/3')
        .set({ authorization: token })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message)
            .toEqual('Recipe with ID 3 does not exist');
          done();
        });
    });

  it('should get all users favourited recipes return 200', (done) => {
    chai
      .request(app)
      .get('/api/v1/favourites/1')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message)
          .toEqual('No Favourites Found please try to create some');
        done();
      });
  });
});
