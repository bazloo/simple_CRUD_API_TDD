import request from 'supertest';
import server from '../../src/server';
import UserModel, { db } from '../../src/database';

const testUser = {
  username: 'test-user',
  age: 2023,
  hobbies: ['coding'],
};

const updatedUser = {
  username: 'yang user',
  age: 18,
  hobbies: ['gaming'],
};

beforeEach(async () => {
  await db.dropCollections();
});

describe('users API', () => {
  it('gets empty array', (done) => {
    request(server).get('/api/users').send().then((res) => {
      expect(res.body).toBeTruthy();
      expect(res.body.length).toEqual(0);
      expect(res.status).toBe(200);
      done();
    });
  });

  it('creates user', (done) => {
    request(server).post('/api/users').send(testUser).then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('could not create user without all required fields', (done) => {
    request(server).post('/api/users').send({ age: 10 }).then((res) => {
      expect(res.status).toBe(400);
      done();
    });
  });

  it('gets user by id', (done) => {
    UserModel.insert(testUser).then((user) => {
      request(server).get(`/api/users/${user.id}`).send().then((res) => {
        expect(res.status).toBe(200);
        expect(res.body[0].id).toBe(user.id);
        done();
      });
    });
  });

  it('gets not exist user', (done) => {
    UserModel.insert(testUser).then((user) => {
      request(server).get('/api/users/not-exist').send().then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeFalsy();
        done();
      });
    });
  });

  it('updates user', (done) => {
    UserModel.insert(testUser).then((user) => {
      request(server).put(`/api/users/${user.id}`).send(updatedUser).then((res) => {
        const updated = res.body;
        expect(res.status).toBe(200);
        expect(updated.username).toBe(updatedUser.username);
        expect(updated.age).toBe(updatedUser.age);
        expect(updated.hobbies).toStrictEqual(updatedUser.hobbies);
        done();
      });
    });
  });

  it('deletes user', (done) => {
    UserModel.insert(testUser).then((result) => {
      request(server).delete(`/api/users/${result.id}`).send()
        .then((res) => {
          expect(res.status).toBe(200);
          return UserModel.find({ id: result.id });
        })
        .then((user) => {
          expect(user.length).toBeFalsy();
          done();
        });
    });
  });

  it('non exist route', (done) => {
    request(server).get('/api/nonsense').send().then((res) => {
      expect(res.status).toBe(404);
      done();
    });
  });
});
