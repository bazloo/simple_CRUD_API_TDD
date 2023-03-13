import request from 'supertest';
import { v4 as uuid } from 'uuid';
import getServerInstance from '../../src/server';
import UserModel, { db } from '../../src/database';

const server = getServerInstance();

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

const testId = uuid();

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
      expect(res.status).toBe(201);
      done();
    });
  });

  it('could not create user without all required fields', (done) => {
    request(server).post('/api/users').send({ age: 10 }).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toEqual('The fields "username", "age", "hobbies" are required!');
      done();
    });
  });

  it('could not create user when body object is empty', (done) => {
    request(server).post('/api/users').send().then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toEqual('The fields "username", "age", "hobbies" are required!');
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

  it('gets not existing user', (done) => {
    UserModel.insert(testUser).then((user) => {
      request(server).get(`/api/users/${testId}`).send().then((res) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual('User with such id doesn\'t exist');
        done();
      });
    });
  });

  it('gets user using wrong id pattern', (done) => {
    UserModel.insert(testUser).then((user) => {
      request(server).get('/api/users/not-exist').send().then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('Invalid user id');
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

  it('can not update user when body have\'t invalid fields', (done) => {
    UserModel.insert(testUser).then((user) => {
      request(server).put(`/api/users/${user.id}`).send({ profession: 'worker' }).then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('Invalid field type, should be: {"username":"string","age":"number","hobbies":["string"]}');
        done();
      });
    });
  });

  it('could not update user using wrong id pattern', (done) => {
    UserModel.insert(testUser).then((user) => {
      request(server).put('/api/users/not-an-uuid').send(updatedUser).then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('Invalid user id');
        done();
      });
    });
  });

  it('could not update user which is not exist', (done) => {
    UserModel.insert(testUser).then((user) => {
      request(server).put(`/api/users/${testId}`).send(updatedUser).then((res) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual('User with such id doesn\'t exist');
        done();
      });
    });
  });

  it('deletes user', (done) => {
    UserModel.insert(testUser).then((result) => {
      request(server).delete(`/api/users/${result.id}`).send()
        .then((res) => {
          expect(res.status).toBe(204);
          return UserModel.find({ id: result.id });
        })
        .then((user) => {
          expect(user.length).toBeFalsy();
          done();
        });
    });
  });

  it('could not delete user using wrong id pattern', (done) => {
    UserModel.insert(testUser).then((user) => {
      request(server).delete('/api/users/not-an-uuid').send(updatedUser).then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('Invalid user id');
        done();
      });
    });
  });

  it('could not delete user which is not exist', (done) => {
    UserModel.insert(testUser).then((user) => {
      request(server).delete(`/api/users/${testId}`).send(updatedUser).then((res) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual('User with such id doesn\'t exist');
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
