const request = require('supertest');
const app = require('../src/app');

describe('Debouncing', () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  test('POST /search validates payload', async () => {
    const response = await request(app).post('/search').send({ query: '', userId: '' });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('GET /search/:requestId returns 404 for unknown request', async () => {
    const response = await request(app).get('/search/00000000-0000-0000-0000-000000000000');
    expect(response.statusCode).toBe(404);
    expect(response.body.error.code).toBe('NOT_FOUND');
  });
});
