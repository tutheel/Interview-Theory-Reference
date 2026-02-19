const request = require('supertest');
const app = require('../src/app');

describe('middleWareExamples', () => {
  test('GET /middleware/error returns demo error', async () => {
    const response = await request(app).get('/middleware/error');
    expect(response.statusCode).toBe(500);
    expect(response.body.error.code).toBe('DEMO_ERROR');
  });

  test('POST /middleware/validate validates payload', async () => {
    const response = await request(app).post('/middleware/validate').send({ name: 'a' });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('GET /middleware/protected requires auth', async () => {
    const response = await request(app).get('/middleware/protected');
    expect(response.statusCode).toBe(401);
    expect(response.body.error.code).toBe('UNAUTHORIZED');
  });
});
