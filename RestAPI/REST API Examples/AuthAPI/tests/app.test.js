const request = require('supertest');
const app = require('../src/app');

describe('AuthAPI', () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  test('POST /auth/register validates payload', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'bad-email',
      password: '123',
      name: ''
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('GET /me requires auth', async () => {
    const response = await request(app).get('/me');
    expect(response.statusCode).toBe(401);
    expect(response.body.error.code).toBe('UNAUTHORIZED');
  });
});
