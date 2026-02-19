process.env.RATE_LIMIT_WINDOW_MS = '60000';
process.env.RATE_LIMIT_MAX = '1';
process.env.API_KEY_RATE_LIMIT_MAX = '1';

const request = require('supertest');
const app = require('../src/app');

describe('RateLimiting', () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  test('IP-based limiting returns 429 on second request', async () => {
    const first = await request(app).get('/limited');
    expect(first.statusCode).toBe(200);

    const second = await request(app).get('/limited');
    expect(second.statusCode).toBe(429);
    expect(second.body.error.code).toBe('RATE_LIMITED');
  });

  test('API-key limiting returns 429 on second request for same key', async () => {
    const first = await request(app).get('/limited').set('x-api-key', 'key-1');
    expect(first.statusCode).toBe(200);

    const second = await request(app).get('/limited').set('x-api-key', 'key-1');
    expect(second.statusCode).toBe(429);
    expect(second.body.error.code).toBe('RATE_LIMITED');
  });
});
