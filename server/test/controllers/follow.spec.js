import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import { userToken, userToken2 } from '../mockData/tokens';

const { User, Follow } = db;

chai.use(chaiHttp);

describe('Follow Model', () => {
  describe('User follows', () => {
    it('Should get show proper error message when user is not authorized', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/jesseinit/follow')
        .send({});

      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not logged in.');
      expect(response.body.data.statusCode).to.eqls(401);
    });

    it('Should get show proper error message when user to be followed is not found', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/jesseinitjesseinit/follow')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({});

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
      expect(response.body.data.statusCode).to.eqls(404);
    });

    it('Should get show proper error message when user tries to follow himself/herself', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/jesseinit/follow')
        .set('Authorization', `Bearer ${userToken}`)
        .send({});

      expect(response.status).to.eqls(400);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You cannot follow yourself');
      expect(response.body.data.statusCode).to.eqls(400);
    });

    it('Should get show proper message when user successfully follows another user', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/kabir/follow')
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.status).to.eqls(201);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.statusCode).to.eqls(201);
    });

    it('Should get handle unexpected errors that occur when trying to follow user', async () => {
      const stub = sinon
        .stub(Follow, 'findOrCreate')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));
      const response = await chai
        .request(app)
        .post('/api/v1/users/jesseinit/follow')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({});

      expect(response.status).to.eqls(500);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.statusCode).to.eqls(500);
      stub.restore();
    });
  });

  describe('Get followers', () => {
    it("Should get show proper error message when getting the followers of users that don't exist", async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/jesseinitjesseinit/followers');

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
      expect(response.body.data.statusCode).to.eqls(404);
    });

    it('Should get show proper message when user does not have any followers', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/jesseinit/followers');

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls(
        'Followers returned successfully'
      );
      expect(response.body.data.statusCode).to.eqls(200);
    });

    it('Should get handle unexpected errors when trying to get the followers of a user', async () => {
      const stub = sinon
        .stub(Follow, 'findAll')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));
      const response = await chai
        .request(app)
        .get('/api/v1/users/kabir/followers');

      expect(response.status).to.eqls(500);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.statusCode).to.eqls(500);
      stub.restore();
    });
  });

  describe('Get following', () => {
    it("Should get show proper error message when getting the following of users that don't exist", async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/jesseinitjesseinit/following');

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
      expect(response.body.data.statusCode).to.eqls(404);
    });

    it('Should get show proper message when user is not following any other user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/kabir/following');

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.statusCode).to.eqls(200);
    });

    it('Should get handle unexpected errors when trying to get the following of a user', async () => {
      const stub = sinon
        .stub(Follow, 'findAll')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));
      const response = await chai
        .request(app)
        .get('/api/v1/users/jesseinit/following');

      expect(response.status).to.eqls(500);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.statusCode).to.eqls(500);
      stub.restore();
    });
  });

  describe('User Unfollows', () => {
    it('Should get show proper error message when user is not authorized to unfollow', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/jesseinit/follow')
        .send({});

      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not logged in.');
      expect(response.body.data.statusCode).to.eqls(401);
    });

    it("Should get show proper error message when trying to unfollow a user doesn't exist", async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/jesseinitjesseinit/follow')
        .set('Authorization', `Bearer ${userToken2}`);

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
      expect(response.body.data.statusCode).to.eqls(404);
    });

    it('Should get show proper message when user successfully unfollows another user', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/kabir/follow')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.statusCode).to.eqls(200);
    });

    it('Should get handle unexpected errors that occur when trying to unfollow user', async () => {
      const stub = sinon
        .stub(User, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));
      const response = await chai
        .request(app)
        .post('/api/v1/users/jesseinit/follow')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({});

      expect(response.status).to.eqls(500);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.statusCode).to.eqls(500);
      stub.restore();
    });
  });
});
