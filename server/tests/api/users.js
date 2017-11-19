import chai from 'chai';
import expect from 'expect';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);

describe('More Recipes', () => {
  it('should throw an error if userName is empty', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter a valid userName!');
      });
    done();
  });

  it('should throw an error if email is empty', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        userName: 'ucheya'
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter a valid email!');
      });
    done();
  });

  it('should throw an error if password is empty', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        userName: 'ucheya',
        email: 'ucheya@gmail.com'
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter a valid password!');
      });
    done();
  });

  it('should throw an error if password is less than 8 characters', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        userName: 'ucheya',
        email: 'ucheya@gmail.com',
        password: '1234567'
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message)
          .toEqual('Password must be up to 8 characters!');
      });
    done();
  });

  it('should successfully signup a user', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        userName: 'ucheya',
        email: 'ucheya@gmail.com',
        password: '12345678'
      })
      .end((err, res) => {
        expect(res.status).toEqual(201);
        expect(res.body.message)
          .toEqual('User successfully created');
      });
    done();
  });

  it('should throw an error if email is empty', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter a valid email!');
      });
    done();
  });

  it('should throw an error if password is empty', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'ucheya@gmail.com'
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter a valid password!');
      });
    done();
  });

  it('should throw an error if password is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'ucheya@gmail.com',
        password: '1234567'
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message)
          .toEqual('Invalid password!');
      });
    done();
  });

  it('should throw an error if user uses incorrect details', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'ucheya@gmail.com',
        password: '123456789'
      })
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message)
          .toEqual('Incorrect login details!');
      });
    done();
  });

  it('should throw an error if user uses incorrect details', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'ucheyao@gmail.com',
        password: '12345679'
      })
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message)
          .toEqual('Incorrect login details!');
      });
    done();
  });

  it('should successfully log user in', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'ucheya@gmail.com',
        password: '12345678'
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Welcome!');
      });
    done();
  });
});
