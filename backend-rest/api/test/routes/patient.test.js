const { StatusCodes } = require('http-status-codes');
const request = require('supertest')
const { describe, it, beforeAll, afterAll } = require('@jest/globals')
const app = require('../../app.js');
const { patients } = require('../../models');

let server;

beforeAll(async () => {
  const port = 3000;
  server = app.listen(port);
});

afterAll(async () => {
  server.close();
});

const patientsToCreate = [
  {
    uuid: 'db7a27cc-69c4-46eb-ad0d-3166972bfbc9',
    name: 'Pedro Prado',
    phone: '+551100000000',
    email: 'pedro@xmail.com',
    birth_date: '1990-05-15',
    gender: "male",
    height: '1.75',
    weight: '72.50'
  }
]

describe('POST in /patients', () => {
  it('Should create a patient', async () => {
    const response = await request(app)
      .post('/patients')
      .send(patientsToCreate[0])
      .expect(StatusCodes.CREATED);

    expect(response.body.email).toEqual(patientsToCreate[0].email);
  });
});

describe('GET in /patients', () => {
  it('Should return a list of patients', async () => {
    const response = await request(app)
      .get('/patients')
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);
    expect(response.body[0].email).toEqual(patientsToCreate[0].email);
  });
});

describe('GET in /patients/uuid', () => {
  it('Should return one patient by UUID', async () => {
    const response = await request(app)
      .get(`/patients/${patientsToCreate[0].uuid}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);
    expect(response.body.email).toEqual(patientsToCreate[0].email);
  });
});

describe('PATCH /patients/:uuid', () => {
  test.each([
    ['name', { name: 'Paula Prado' }],
    ['phone', { phone: '+5521999998888' }],
    ['birth_date', { birth_date: '1980-05-15' }],
    ['gender', { gender: 'other' }],
    ['height', { height: '1.80' }],
    ['weight', { weight: '55.00' }]
  ])('Should update field %s', async (key, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');

    await requisicao.request(app)
      .patch(`/patients/${patientsToCreate[0].uuid}`)
      .send(param)
      .expect(StatusCodes.OK);

    const updatedPatient = await patients.findOne({ where: { uuid: patientsToCreate[0].uuid } });

    let valueOfKeyParam
    expect(updatedPatient[key]).toEqual(String(param[key]));


    expect(spy).toHaveBeenCalled();
  });
});
