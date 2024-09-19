const request = require('supertest');
const app = require('../api/app');


let emailCounter = 3;

describe('POST /api/auth/register', () => {
  it('should create a new user', async () => {
    const email = `user${emailCounter}@test.com`;
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        first_name: 'test',
        last_name: 'user',
        email: email,
        password: '12345',
      })
      .expect('Content-Type', /json/);

    console.log('Response body:', response.body);

    expect(response.statusCode).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.first_name).toBe('test');
    expect(response.body.data.last_name).toBe('user');
    expect(response.body.data.email).toBe(email);
    expect(response.body.data).not.toHaveProperty('password');

    emailCounter++;
  });
});

describe('POST /api/auth/login', () => {
  it('should login an existing user', async () => {
    const email = `user${emailCounter - 1}@test.com`;
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: email,
        password: '12345',
      })
      .expect('Content-Type', /json/);

    console.log('Response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toContain('.');
    expect(response.body.message).toBe('User logged in successfully');
  });

  it('should fail with incorrect password', async () => {
    const email = `user${emailCounter - 1}@test.com`;
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: email,
        password: 'wrongpassword',
      })
      .expect('Content-Type', /json/);

    console.log('Response body:', response.body);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Username or password is not correct. Please Check.');
  });
});
