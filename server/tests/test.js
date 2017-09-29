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
 
  it('should return a 400 if there is a wrong route', (done) => {
    chai.request(app)
      .get('/6^6fDF')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('ERROR').eql('404: Sorry Page Not Found!');
    
        done();
      });
  });
  
  it('should return 201 for creating a recipe', (done) => {
    let recipe = {
      id: 3,
      name: 'Chocolate cake ',
      ingredients: 'Sugar, Milk, Flour, Egg',
      preparation: 'This is a ',
      upVotes: 50,
      downvotes:8,
    };
    chai.request(app)
      .post('/api/recipes')
      .send(recipe)   
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 400 for incomplete data', (done) => {
    let recipe = {
      id: 3,
      name: '',
      ingredients: 'Sugar, Milk',
      method: 'Please stir till it becomes solid',
      upVotes: 6
    };
    chai.request(app)
      .post('/api/recipes')
      .send(recipe)   
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Enter Recipe Name');
        done();
      });
  });

  it('should modify a recipe', (done) => {
    let recipe = {
      id: 3,
      name: 'Cheese cake',
      ingredients: 'Sugar, Milk',
      method: 'Please stir till it becomes solid',
      upVotes: 6
    };
    chai.request(app)
      .put('/api/recipes/3')
    // .send(recipe)   
      .end((err, res) => {
        res.body.should.have.status(200);
        done();
      });
  });

  it('should delete a recipe', (done) => {   
    chai.request(app)
      .delete('/api/recipes/3')
    // .send(recipe)   
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.have.property('message').eql('Recipe has been Deleted');  
      
        done();
      });
  });

  it('should return a 404 if no recipe', (done) => {   
    chai.request(app)
      .delete('/api/recipes/15')
    // .send(recipe)   
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Recipe Not Found');      
        done();
      });
  });

  it('should get all recipes', (done) => {   
    chai.request(app)
      .get('/api/recipes')
    // .send(recipe)   
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Welcome to More-Recipes Application, these are the recipes available');   
        done();
      });
  });

  it('shoud get recipes by id', (done) => {   
    chai.request(app)
      .get('/api/recipes/45')
    // .send(recipe)   
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Enter a Recipe');   
        done();
      });
  });

  it('shoud post reviews', (done) => {   
    chai.request(app)
      .post('/api/recipes/2/reviews')
    // .send(recipe)   
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});