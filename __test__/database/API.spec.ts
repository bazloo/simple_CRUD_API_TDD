import request from 'supertest';
import server from '../../src/server';

describe('users API', () => {
  it('gets all users', (done) => {
    request(server).get('/api/users').send().then((res) => {
      console.log(res.body);
      const { users } = res.body;

      expect(users).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);
      expect(res.status).toBe(200);
      done();
    });
  });

  it('creates user', (done) => {
    request(server).post('/api/users').send().then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('gets user by id', (done) => {
    request(server).get('/api/users').send().then((res) => {
      expect(res.status).toBe(200);
      done();
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
