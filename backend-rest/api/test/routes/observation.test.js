const { StatusCodes } = require('http-status-codes');
const request = require('supertest')
const { describe, it, beforeAll, afterAll } = require('@jest/globals')
const { patients, appointments } = require('../../models');
const app = require('../../app.js');

let server;
let bearerToken;

const patientToCreate = {
  "uuid": "2bdbc4cf-659d-4c12-9721-08f641151ba6",
  "name": "Isabela Lisbela",
  "phone": "+554177171717",
  "email": "belabela@gmail.com",
  "birthDate": "1998-06-16",
  "gender": "female",
  "height": "1.60",
  "weight": "52.30"
};

const appointmentToCreate = {
  "uuid": "c469a15e-1dfa-424c-85a2-75c96ad0567c",
  "description": "Primeira consulta da manhã",
  "startTime": "2035-12-20 09:30:00",
  "endTime": "2035-12-20 10:30:00"
};

const observationToCreate = {
  "uuid": "6112c28c-e97b-4823-9e73-ec89074449bf",
  "message": "Devemos solicitar exames mais profundos"
};

async function seed() {
  await patients.bulkCreate([patientToCreate], { ignoreDuplicates: true });
}

beforeAll(async () => {
  const port = 3000;
  server = app.listen(port);

  await seed();

  const response = await request(app)
    .post('/auth/login')
    .send({
      "email": "house.md@gmail.com",
      "password": "lupos"
    });

  bearerToken = response.text;
});

afterAll(async () => {
  server.close();
});

describe('POST Authenticated in /appointments/uuid/observations', () => {
  it(`Should create a appointment by patient UUID ${patientToCreate.uuid}`, async () => {
    const response = await request(app)
      .post(`/patients/${patientToCreate.uuid}/appointments`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(appointmentToCreate)
      .expect(StatusCodes.CREATED);
  });

  it(`Should create observation by appointments UUID ${appointmentToCreate.uuid}`, async () => {
    const response = await request(app)
      .post(`/appointments/${appointmentToCreate.uuid}/observations`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(observationToCreate)
      .expect(StatusCodes.CREATED);
  });
});

describe('GET Authenticated in /appointments/uuid/observations', () => {
  (`Should return a list of observation to appointment UUID ${appointmentToCreate.uuid}`, async () => {
    const response = await request(app)
      .get(`/appointments/${appointmentToCreate.uuid}/observations`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);

    expect(response.body[0].message).toEqual(observationToCreate.message);
  });
});
