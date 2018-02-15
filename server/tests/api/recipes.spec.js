import chai from 'chai';
import expect from 'expect';
import chaiHttp from 'chai-http';
import { user1, user2 } from '../helpers/userHelper';
import {
  recipe1, recipe2, recipe3, recipe4, recipe5,
  recipe6, recipe7, recipe8, createdRecipe, createdRecipe2
} from '../helpers/recipeHelper';


import app from '../../app';


chai.use(chaiHttp);

let token;
let token2;
let name = 'Rice';

describe('More Recipes', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(user1)
      .end((err, res) => {
        token = res.body.token;
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Welcome!', token);
      });

    chai.request(app)
      .post('/api/v1/users/signin')
      .send(user2)
      .end((err, res) => {
        token2 = res.body.token;
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Welcome!', token);
        done();
      });
  });

  it('should throw an error if recipeName is empty and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('authorization', token)
      .send(recipe1)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.recipeNameError).toEqual('recipename is required');
        done();
      });
  });

  it('should throw an error if recipeName is less than 3 characters long and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set('authorization', token)
      .send(recipe2)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.recipeNameError).toEqual('recipename must be at least 3 characters long');
        done();
      });
  });


  it('should throw an error if description is empty and return 400 and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set('authorization', token)
      .send(recipe3)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.descriptionError).toEqual('description is required');
        done();
      });
  });


  it('should throw an error if description is less than 4 characters and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set('authorization', token)
      .send(recipe4)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.descriptionError).toEqual('description must be at least 4 characters long');
        done();
      });
  });


  it('should throw an error if ingredients is empty and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set('authorization', token)
      .send(recipe5)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.ingredientsError).toEqual('ingredients is required');
        done();
      });
  });

  it('should throw an error if ingredients is less than 5 characters and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set('authorization', token)
      .send(recipe6)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.ingredientsError).toEqual('ingredients must be at least 5 characters long');
        done();
      });
  });


  it('should throw an error if preparation is empty and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set({ authorization: token })
      .send(recipe7)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.preparationError).toEqual('preparation is required');
        done();
      });
  });

  it('should throw an error if preparation is less than 5 characters and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set({ authorization: token })
      .send(recipe8)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.preparationError)
          .toEqual('preparation must be at least 5 characters long');
        done();
      });
  });

  it('should successfully create a recipe and return 200', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set({ authorization: token })
      .send(createdRecipe)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message)
          .toEqual('Recipe successfully added', createdRecipe);
        done();
      });
  });

  it('should successfully create a recipe and return 200', (done) => {
    chai.request(app)
      .post('/api/v1/recipes').set({ authorization: token })
      .send(createdRecipe2)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message)
          .toEqual('Recipe successfully added', createdRecipe2);
        done();
      });
  });

  it('should successfully get a recipe and return 200', (done) => {
    chai.request(app)
      .get('/api/v1/user/1/recipes/1').set({ authorization: token })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message)
          .toEqual();
        done();
      });
  });

  it('should throw an error if recipeId is not valid and return 404', (done) => {
    chai.request(app)
      .get('/api/v1/user/1/recipes/5').set({ authorization: token })
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message)
          .toEqual('No recipes found. Please try to create some.');
        done();
      });
  });

  it('should update views for recipe if requesting user is not recipe owner', (done) => {
    chai.request(app)
      .get('/api/v1/user/2/recipes/1').set({ authorization: token2 })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  });

  it('should successfully get all recipes and return 200', (done) => {
    chai.request(app)
      .get('/api/v1/recipes').set({ authorization: token })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  });

  it(`should successfully get all recipes if sorted out 
      with upvotes and descending order and return 200`, (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .set({ authorization: token })
        .query({ sort: 'upVotes', order: 'des' })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done();
        });
    });

  it('should successfully get all user recipes and return 200', (done) => {
    chai.request(app)
      .get('/api/v1/myrecipes').set({ authorization: token })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  });

  it(`should successfully get all user recipes if sorted out 
      with created date and descending order and return 200`, (done) => {
      chai.request(app)
        .get('/api/v1/myrecipes')
        .set({ authorization: token })
        .query({ sort: 'createdAt', order: 'des' })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done();
        });
    });

  it('should throw an error when a user without a recipe trys to get his or her own recipes and return 200', (done) => {
    chai.request(app)
      .get('/api/v1/myrecipes').set({ authorization: token2 })
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message)
          .toEqual('No recipes found. Please try to create one.');
        done();
      });
  });

  it('should successfully update a recipe and return 200', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/1').set({ authorization: token })
      .send({
        recipeName: 'Tikwo Shinkapa',
        description: 'Hausa Best Rice Enriched Food',
        ingredients: 'Rice, Water, Floor',
        preparation: 'Cook, Boil',
        image: 'rice.jpeg',
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Recipe successfully updated');
        done();
      });
  });

  it('should successfully delete a recipe and return 200', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/2').set({ authorization: token })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Recipe deleted!');
        done();
      });
  });

  it('should throw an error if user trys to delete a recipe that does not exist and return 404', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/5').set({ authorization: token })
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('Recipe does not exist!');
        done();
      });
  });

  it('should successfully search for a recipe and return 200', (done) => {
    chai.request(app)
      .post('/api/v1/search')
      .set({ authorization: token })
      .query({ name, offset: 0, limit: 6 })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  });

  it('should throw an error if user trys to search for an empty recipeName and return 404', (done) => {
    chai.request(app)
      .post('/api/v1/search')
      .set({ authorization: token })
      .query({ name: '', offset: 0, limit: 6 })
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('no search parameter/limit');
        done();
      });
  });
});
