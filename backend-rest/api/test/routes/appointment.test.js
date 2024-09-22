const { StatusCodes } = require('http-status-codes');
const request = require('supertest')
const { describe, it, beforeAll, afterAll } = require('@jest/globals')
const app = require('../../app.js');
const { patients } = require('../../models');

let server;
let bearerToken;

const patientsToCreate = [
  {
    "uuid": "cdc12e84-c821-42ba-aac6-979175126a36",
    "name": "Francisco Fernandez",
    "phone": "+553100101010",
    "email": "chicof@xmail.com",
    "birthDate": "1991-06-16",
    "gender": "male",
    "height": "1.65",
    "weight": "65.50"
  },
  {
    "uuid": "8234ae32-91d4-4a6b-91e6-376c7bf8003f",
    "name": "Venessa Volpato",
    "phone": "+553179797979",
    "email": "nessav@umail.com",
    "birthDate": "1998-10-18",
    "gender": "female",
    "height": "1.67",
    "weight": "52.00"
  },
  {
    "uuid": "1973d488-8aa1-48c9-80a0-3a94ef3bedda",
    "name": "Sabrina Santori",
    "phone": "+553188769933",
    "email": "sabrinas@umail.com",
    "birthDate": "1998-04-17",
    "gender": "female",
    "height": "1.67",
    "weight": "52.00"
  },
  {
    "uuid": "2cc68e7d-debc-4bde-ae5c-0a569fc97d85",
    "name": "Priscila Pires",
    "phone": "+553111111111",
    "email": "paulop@umail.com",
    "birthDate": "1995-01-28",
    "gender": "other",
    "height": "1.73",
    "weight": "64.00"
  },
  {
    "uuid": "4aea82a4-a7ba-4a29-92cf-f21c764ddf96",
    "name": "Paciente Difícil de Encontrar Horário Para Agendar",
    "phone": "+553111111111",
    "email": "hardappointment@umail.com",
    "birthDate": "1995-01-28",
    "gender": "male",
    "height": "1.73",
    "weight": "64.00"
  }
];

const appointmentsToCreate = [
  {
    "uuid": "cd6df63f-58bb-4d2c-bc8c-f67d902afdf2",
    "description": "Primeira consulta da manhã",
    "startTime": "2025-12-20 09:30:00",
    "endTime": "2025-12-20 10:30:00"
  },
  {
    "uuid": "52c78f56-ab4d-4b26-8670-fd1a2c8de9c5",
    "description": "Segunda consulta da manhã",
    "startTime": "2025-12-20 11:20:00",
    "endTime": "2025-12-20 12:20:00"
  },
  {
    "uuid": "f6832835-2397-41be-9963-e94333afa876",
    "description": "Primeira consulta da Tarde",
    "startTime": "2025-12-20 13:30:00",
    "endTime": "2025-12-20 14:30:00"
  },
  {
    "uuid": "bd567c6d-9aae-49eb-baa3-ceea87cae473",
    "description": "Segunda consulta da Tarde",
    "startTime": "2025-12-20 15:30:00",
    "endTime": "2025-12-20 16:30:00"
  }
];

const patientToConflictAppointment = patientsToCreate[patientsToCreate.length - 1];

const apointmentToConflict = {
  "uuid": "6bffa654-8a96-4097-b2e7-a243f92e2672",
  "description": "Agendamento Difícil de encaixar",
};

const conflictCreateDates = [
  {
    "startTime": "2025-12-20 08:40:00",
    "endTime": "2025-12-20 09:40:00"
  },
  {
    "startTime": "2025-12-20 10:25:00",
    "endTime": "2025-12-20 11:25:00"
  },
  {
    "startTime": "2025-12-20 15:25:00",
    "endTime": "2025-12-20 16:25:00"
  },
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

describe('POST Authenticated in /appointments/uuid/appointments', () => {
  test.each([
    [0, patientsToCreate[0].uuid, appointmentsToCreate],
    [1, patientsToCreate[1].uuid, appointmentsToCreate],
    [2, patientsToCreate[2].uuid, appointmentsToCreate],
    [3, patientsToCreate[3].uuid, appointmentsToCreate]
  ])('Should create a appointment %s by patient UUID %s', async (key, patientUUID, appointmentsToCreate) => {
    const response = await request(app)
      .post(`/patients/${patientUUID}/appointments`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(appointmentsToCreate[key])
      .expect(StatusCodes.CREATED);

    expect(response.body.description).toEqual(appointmentsToCreate[key].description);
  });

  test.each([
    [0, patientToConflictAppointment.uuid, apointmentToConflict, conflictCreateDates],
    [1, patientToConflictAppointment.uuid, apointmentToConflict, conflictCreateDates],
    [2, patientToConflictAppointment.uuid, apointmentToConflict, conflictCreateDates]
  ])('Should conflict date time appointment %s on create by patient UUID %s', async (key, patientUUID, apointmentToConflict, conflictCreateDates) => {
    const response = await request(app)
      .post(`/patients/${patientUUID}/appointments`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .send({
        ...apointmentToConflict,
        ...conflictCreateDates[key]
      })
      .expect(StatusCodes.CONFLICT);
  });
});

describe('GET Authenticated in /appointments/uuid/appointments', () => {
  it('Should return a list of appointments with length equal a one', async () => {
    const response = await request(app)
      .get(`/patients/${patientUUID}/appointments`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);
  });
});

