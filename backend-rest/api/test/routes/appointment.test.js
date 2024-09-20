const { StatusCodes } = require('http-status-codes');
const request = require('supertest')
const { describe, it, beforeAll, afterAll } = require('@jest/globals')
const app = require('../../app.js');
const { patients } = require('../../models');

let server;
let bearerToken;

const patientsToCreate = [
  {
    uuid: "cdc12e84-c821-42ba-aac6-979175126a36",
    name: "Francisco Fernandez",
    phone: "+553100101010",
    email: "chicof@xmail.com",
    birthDate: "1991-06-16",
    gender: "male",
    height: "1.65",
    weight: "65.50"
  },
  {
    uuid: "8234ae32-91d4-4a6b-91e6-376c7bf8003f",
    name: "Venessa Volpato",
    phone: "+553179797979",
    email: "nessav@umail.com",
    birthDate: "1998-10-18",
    gender: "female",
    height: "1.67",
    weight: "52.00"
  }
];

const appointmentsToCreate = [
  {
    uuid: "d6fc8f21-4e27-4fe7-9cc8-0f7bfe6fe9d0",
    description: "Agendamento de consulta para tratar dos sintomas",
    startTime: "2024-12-20 13:30:00",
    endTime: "2024-12-20 14:30:00"
  }
];

async function seedPatients() {
  await patients.bulkCreate(patientsToCreate, { ignoreDuplicates: false });
}

beforeAll(async () => {
  const port = 3000;
  server = app.listen(port);

  await seedPatients();

  const response = await request(app)
    .post('/auth/login')
    .send({
      "email": "house@md.com",
      "password": "lupos"
    });

  bearerToken = response.text;
});

afterAll(async () => {
  server.close();
});

describe('POST Authenticated in /appointments', () => {
  it('Should create a appointments', async () => {
    const response = await request(app)
      .post(`/appointments/${patientsToCreate[0].uuid}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(appointmentsToCreate[0])
      .expect(StatusCodes.CREATED);

    expect(response.body.email).toEqual(appointmentsToCreate[0].description);
  });
});


