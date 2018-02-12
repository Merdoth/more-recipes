import chai from 'chai';
import expect from 'expect';
import chaiHttp from 'chai-http';
import {
  createUser1, createUser2, createUser3, createUser4, createUser5,
  createUser6, createUser7,
  invalidUser, createdUser, createdUser2, fakeUser, userError, user1
} from '../helpers/userHelper';
import app from '../../app';


chai.use(chaiHttp);

let token;

describe('More Recipes', () => {
  it('should  throw an error if there are no users and return 404', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('Users not found');
        done();
      });
  });

  it('should throw an error if fullName is empty & return 400', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(createUser1)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.fullNameError).toEqual('fullname is required');
        done();
      });
  });


  it('should throw an error if fullName is less than 3 characters & return 400', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(createUser2)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.fullNameError).toEqual('fullname must be at least 3 characters long');
        done();
      });
  });

  it('should throw an error if userName is empty & return 400', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(createUser3)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.userNameError).toEqual('username is required');
        done();
      });
  });

  it('should throw an error if userName is less than 3 characters & return 400', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(createUser4)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.userNameError).toEqual('username must be at least 3 characters long');
        done();
      });
  });

  it('should throw an error if email is empty & return 400', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(createUser5)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.emailError).toEqual('email is required');
        done();
      });
  });

  it('should throw an error if email is not valid & return 400', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(createUser6)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.emailError).toEqual('email is not valid');
        done();
      });
  });

  it('should throw an error if password is empty & return 400', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(createUser7)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.passwordError).toEqual('password is required');
        done();
      });
  });

  it(
    'should throw an error if password is less than 8 characters & return 400 ',
    (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(invalidUser)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error.passwordError)
            .toEqual('password must be at least 8 characters long');
          done();
        });
    }
  );

  it('should successfully signup a user and return 201', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(createdUser)
      .end((err, res) => {
        token = res.body.token;
        expect(res.status).toEqual(201);
        expect(res.body.message)
          .toEqual('User successfully created', token);
        done();
      });
  });

  it('should successfully signup a user and return 201', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(createdUser2)
      .end((err, res) => {
        token = res.body.token;
        expect(res.status).toEqual(201);
        expect(res.body.message)
          .toEqual('User successfully created', token);
        done();
      });
  });

  it(
    'should throw an error if user uses incorrect details and return 400',
    (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(userError)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message)
            .toEqual('Incorrect login details!');
          done();
        });
    }
  );

  it(
    'should throw an error if user does not exist and return 404',
    (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(fakeUser)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message)
            .toEqual('User does not exist!');
          done();
        });
    }
  );

  it('should successfully log user in and return 200', (done) => {
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

  it('should successfully return all users and return 200', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.users.length).toEqual(2);
        done();
      });
  });

  it('should successfully return a user and return 200', (done) => {
    chai.request(app)
      .get('/api/v1/user').set('authorization', token)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        const expectedUser = {
          fullName: 'chimereucheya okereke',
          userName: 'ucheya',
          email: 'ucheya@gmail.com',
          favorites: []
        };
        expect(res.body.user).toEqual(expectedUser);
        done();
      });
  });

  it('should successfully update a user profile and return 200', (done) => {
    chai.request(app)
      .put('/api/v1/update').set('authorization', token)
      .send({
        userName: 'Bisola',
        fullName: 'Bisola Ogeh',
        email: 'ucheya@gmail.com'
      })
      .end((err, res) => {
        const expectedUser = {
          fullName: 'Bisola Ogeh',
          userName: 'Bisola',
          email: 'ucheya@gmail.com',
        };

        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Your account has been updated');
        expect(res.body.user).toEqual(expectedUser);
        done();
      });
  });
});

