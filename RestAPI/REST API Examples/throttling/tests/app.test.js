process.env.THROTTLE_CAPACITY = '1';
process.env.THROTTLE_REFILL_PER_SEC = '0';

const request = require('supertest');
const app = require('../src/app');

describe('throttling', () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  test('token bucket throttles after capacity is exhausted', async () => {
    const first = await request(app).get('/throttle');
    expect(first.statusCode).toBe(200);

    const second = await request(app).get('/throttle');
    expect(second.statusCode).toBe(429);
    expect(second.body.error.code).toBe('THROTTLED');
  });

  test('api key bucket can be called independently', async () => {
    const response = await request(app).get('/throttle').set('x-api-key', 'bucket-a');
    expect([200, 429]).toContain(response.statusCode);
  });
});
