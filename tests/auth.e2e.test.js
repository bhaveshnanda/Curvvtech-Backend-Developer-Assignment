// tests/auth.e2e.test.js
import request from 'supertest';
import app from '../src/app.js';

// NOTE: For brevity, this sample test uses the running app only for shape checking.
// In a real setup, spin up an in-memory Mongo (mongodb-memory-server) and isolate DB.

describe('Auth routes shape', () => {
  it('rejects bad signup', async () => {
    const res = await request(app).post('/auth/signup').send({});
    expect(res.status).toBe(400);
  });
});