import request from 'supertest';
import app from '../src/index';

describe('users API', () => {
  it('get all users', (done) => {
    request(app).get('/api/users').send().then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
});
