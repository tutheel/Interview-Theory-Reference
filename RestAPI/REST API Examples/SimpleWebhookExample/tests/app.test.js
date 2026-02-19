const request = require('supertest');
const app = require('../src/app');

describe('SimpleWebhookExample', () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  test('POST /webhooks/demo validates payload', async () => {
    const response = await request(app).post('/webhooks/demo').send({ type: 'demo' });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('POST /webhooks/demo rejects missing signature', async () => {
    const response = await request(app)
      .post('/webhooks/demo')
      .send({ eventId: 'evt-1', type: 'demo.event' });
    expect(response.statusCode).toBe(401);
    expect(response.body.error.code).toBe('UNAUTHORIZED');
  });
});
