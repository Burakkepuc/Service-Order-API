const request = require('supertest');
const app = require('../api/app');


let emailCounter = 3; // Testler sırasında email sayacını tutmak için global bir değişken

describe('POST /api/auth/register', () => {
  it('should create a new user', async () => {
    const email = `user${emailCounter}@test.com`; // emailCounter'ı kullanarak email'i oluştur
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        first_name: 'test',
        last_name: 'user',
        email: email,
        password: '12345',
      })
      .expect('Content-Type', /json/);

    console.log('Response body:', response.body); // API yanıtını logla

    expect(response.statusCode).toBe(201); // Kullanıcının başarıyla oluşturulduğunu kontrol et
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.first_name).toBe('test');
    expect(response.body.data.last_name).toBe('user');
    expect(response.body.data.email).toBe(email);
    expect(response.body.data).not.toHaveProperty('password');

    emailCounter++; // Her başarılı kayıttan sonra sayacı artır
  });
});

describe('POST /api/auth/login', () => {
  it('should login an existing user', async () => {
    const email = `user${emailCounter - 1}@test.com`; // Son kaydedilen email'i kullan
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: email,
        password: '12345',
      })
      .expect('Content-Type', /json/);

    console.log('Response body:', response.body); // API yanıtını logla

    expect(response.statusCode).toBe(200); // Başarılı giriş durumunu kontrol et
    expect(response.body.data).toBeDefined(); // JWT token'in varlığını kontrol et
    expect(response.body.data).toContain('.'); // Token'in JWT formatında olduğunu kontrol et
    expect(response.body.message).toBe('User logged in successfully');
  });

  it('should fail with incorrect password', async () => {
    const email = `user${emailCounter - 1}@test.com`; // Son kullanıcıyı hatalı şifre ile test et
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: email,
        password: 'wrongpassword',
      })
      .expect('Content-Type', /json/);

    console.log('Response body:', response.body); // Hatalı yanıtı logla

    expect(response.statusCode).toBe(400); // API'nin döndüğü 400 kodunu kontrol et
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Username or password is not correct. Please Check.');
  });
});
