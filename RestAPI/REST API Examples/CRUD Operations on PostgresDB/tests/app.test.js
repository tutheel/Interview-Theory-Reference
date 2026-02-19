import request from 'supertest';
import app from '../src/app.js';

describe('CRUD Operations on PostgresDB', () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  test('POST /users returns validation error for invalid body', async () => {
    const response = await request(app).post('/users').send({ email: 'not-an-email' });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('POST /products returns validation error for invalid price', async () => {
    const response = await request(app)
      .post('/products')
      .send({ name: 'Bad Product', price: -5 });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
