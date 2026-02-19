const request = require('supertest');
const app = require('../src/app');

describe('weatherAPI', () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  test('GET /weather requires city query', async () => {
    const response = await request(app).get('/weather');
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('GET /weather/latlon validates lat/lon', async () => {
    const response = await request(app).get('/weather/latlon?lat=200&lon=10');
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
