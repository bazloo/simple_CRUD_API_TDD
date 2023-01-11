import request from 'supertest';
import server from '../../../src/server';
import { UserModel as UserSchema } from "../../../build/types";
import UserModel, { db } from '../../../src/database/index';

const testUser: UserSchema = {
  id: 1,
  userName: 'test-user',
  age: 2023,
  hobbies: ['coding'],
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
      request(server).get('/api/users/2').send().then((res) => {
        expect(res.status).toBe(200);
        done();
      });
    });
  });

  it('updates user', (done) => {
    request(server).put('/api/users').send().then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('deletes user', (done) => {
    request(server).delete('/api/users').send().then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('non exist route', (done) => {
    request(server).get('/api/nonsense').send().then((res) => {
      expect(res.status).toBe(404);
      done();
    });
  });
});
