import request from 'supertest';
import server from '../../src/server';
import UserModel, { db } from '../../src/database';

const testUser = {
  id: '1',
  userName: 'test-user',
  age: 2023,
  hobbies: ['coding'],
};

const updatedUser = {
  userName: 'yang user',
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

  it('gets user by id', (done) => {
    UserModel.insert(testUser).then(() => {
      request(server).get('/api/users/1').send().then((res) => {
        expect(res.status).toBe(200);
        expect(res.body[0].id).toBe('1');
        done();
      });
    });
  });

  it('gets not exist user', (done) => {
    UserModel.insert(testUser).then(() => {
      request(server).get('/api/users/2').send().then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeFalsy();
        done();
      });
    });
  });

  it('updates user', (done) => {
    UserModel.insert(testUser).then(() => {
      request(server).put('/api/users/1').send(updatedUser).then((res) => {
        const updated = res.body;
        expect(res.status).toBe(200);
        expect(updated.userName).toBe(updatedUser.userName);
        expect(updated.age).toBe(updatedUser.age);
        expect(updated.hobbies).toStrictEqual(updatedUser.hobbies);
        done();
      });
    });
  });

  it('deletes user', (done) => {
    UserModel.insert(testUser).then(() => {
      request(server).delete('/api/users/1').send()
        .then((res) => {
          expect(res.status).toBe(200);
          return UserModel.find({ id: '1' });
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
