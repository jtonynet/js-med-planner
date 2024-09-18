const request = require('supertest')
const { describe, it, beforeAll, afterAll } = require('@jest/globals')
const app = require('../../app.js');

let server;

beforeAll(async () => {
  const port = 3000;
  server = app.listen(port);
});

afterAll(async () => {
  server.close();
});

describe('POST in /patients', () => {
  it('Should create a patient', async () => {
    const response = await request(app)
      .post('/patients')
      .send({
        uuid: 'db7a27cc-69c4-46eb-ad0d-3166972bfbc9',
        name: 'Araujo Hipocondriaco',
        phone: '+5511912345678',
        email: 'araujo@xmail.com',
        birth_date: '1990-05-15',
        gender: "male",
        height: 1.75,
        weight: 72.50
      })
      .expect(201);

    expect(response.body.email).toEqual('araujo@xmail.com');
  });
});
