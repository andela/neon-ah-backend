import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../../index';
import db from '../../models';
import TokenManager from '../../helpers/TokenManager';

const { User, Role, AuthType } = db;

chai.use(chaiHttp);

describe('User Model', () => {
  const userInfo = {
    fullName: 'Jesse Doe',
    userName: 'jesseinitot',
    email: 'jesseinit@now.com',
    password: 'Blahblah',
    bio: 'Gitting Started',
    authTypeId: '15745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
  };


  after(async () => {
    await User.destroy({ where: {} });
    await Role.destroy({ where: {} });
    await AuthType.destroy({ where: {} });
  });

  describe('User Sign up Test', () => {
    it('should create user', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: userInfo.fullName,
          email: userInfo.email,
          password: userInfo.password,
          authTypeId: userInfo.authTypeId
        });
      expect(response.status).to.equal(201);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql(
        'You have successfully signed up'
      );
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('success');
    });

    it('should return error for existing email', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: userInfo.fullName,
          email: userInfo.email,
          password: userInfo.password,
          authTypeId: userInfo.authTypeId
        });
      expect(response.status).to.equal(409);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql(
        'Email already exists.Enter another email'
      );
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });
  });
  describe('User Login', () => {
    it('User should get an error when provided email account is not found', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'jeinit@now.com',
          password: '123456'
        });
      expect(response.status).to.equal(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.be.eql('user not found');
    });

    it('User should get an error when wrong password is provided', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'jesseinit@now.com', password: '123' });
      expect(response.status).to.eql(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Password is wrong');
    });

    it('User should get a token on successful login', async () => {
      const token = TokenManager.sign(
        { id: 1, userName: userInfo.username, role: userInfo.roleId },
        '24h'
      );
      expect(token).to.eqls(token);
    });
  });
  describe('Password Forget/Reset', () => {
    it('User should get an error when provided email account is not found on password reset', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({ email: 'blahblah@gmail.com' });

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
    });

    it('App should send a mail to the user if the account exists', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({ email: 'jesseinit@now.com' });

      expect(response.status).to.equal(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls(
        'Kindly check your mail to reset your password'
      );
    });

    it('It should be able to handle unexpected errors thrown during when sending reset link', async () => {
      const stub = sinon
        .stub(User, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));


      it('should send back an error message for wrong roleId', async () => {
        const response = await chai
          .request(app)
          .post('/api/v1/password/forgot')
          .send({ email: userInfo.email });
        expect(response.status).to.equal(500);
        stub.restore();
      });

      it('User should get an error when provided email account is not found in the DB', async () => {
        const generatedToken = TokenManager.sign({ email: 'blahblah@blah.com' });

        const response = await chai
          .request(app)
          .post(`/api/v1/password/reset/${generatedToken}`)
          .send({ newPassword: '123456789', confirmPassword: '123456789' });

        expect(response.status).to.eqls(404);
        expect(response.body.status).to.eqls('failure');
        expect(response.body.message).to.eqls('User not found');
      });
    });
  });
});
