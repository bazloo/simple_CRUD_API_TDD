import request from 'supertest';
import app from '../../src/app';

describe('users API', () => {
  it('gets all users', (done) => {
    request(app).get('/api/users').send().then((res) => {
      console.log(res.body);
      const { users } = res.body;

      expect(users).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);
      expect(res.status).toBe(200);
      done();
    });
  });

  it('creates user', (done) => {
    request(app).post('/api/users').send().then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('gets user by id', (done) => {
    request(app).get('/api/users').send().then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('updates user', (done) => {
    request(app).put('/api/users').send().then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('deletes user', (done) => {
    request(app).delete('/api/users').send().then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });
});
