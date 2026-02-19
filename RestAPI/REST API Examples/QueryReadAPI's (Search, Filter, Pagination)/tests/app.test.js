const request = require('supertest');
const app = require('../src/app');

describe("QueryReadAPI's", () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  test('GET /items validates limit', async () => {
    const response = await request(app).get('/items?limit=0');
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('GET /items/cursor validates limit', async () => {
    const response = await request(app).get('/items/cursor?limit=0');
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
