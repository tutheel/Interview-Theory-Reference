const request = require('supertest');
const app = require('../src/app');

describe('FileUploadandDownloadAPI', () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  test('GET /files validates pagination params', async () => {
    const response = await request(app).get('/files?page=0');
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('POST /files requires file', async () => {
    const response = await request(app).post('/files');
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
