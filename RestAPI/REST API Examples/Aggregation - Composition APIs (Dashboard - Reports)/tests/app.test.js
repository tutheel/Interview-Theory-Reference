const request = require('supertest');
const app = require('../src/app');

describe('Aggregation / Composition APIs', () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  test('GET /dashboard validates timeoutMs', async () => {
    const response = await request(app).get('/dashboard?timeoutMs=50');
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('GET /reports/summary validates days', async () => {
    const response = await request(app).get('/reports/summary?days=0');
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
