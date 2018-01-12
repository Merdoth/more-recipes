import chai from 'chai';
import expect from 'expect';
import chaiHttp from 'chai-http';
import app from '../../app';


chai.use(chaiHttp);

describe('More Recipes', () => {
  it('should throw an error if userName is empty & return 400', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter a valid userName!');
      });
    done();
  });

  it('should throw an error if email is empty & return 400', (done) => {
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

  it('should throw an error if password is empty & return 400', (done) => {
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

  it('should throw an error if password is less than 8 characters & return 400 ', (done) => {
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

  it('should successfully signup a user and return 201', (done) => {
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

  it('should throw an error if email is empty and return 400', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Please enter a valid email!');
      });
    done();
  });

  it('should throw an error if password is empty and return 400', (done) => {
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

  it('should throw an error if password is invalid and return 400', (done) => {
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

  it('should throw an error if user uses incorrect details and return 404', (done) => {
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

  it('should throw an error if user uses incorrect details and return 404', (done) => {
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

  it('should successfully log user in and return 200', (done) => {
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
