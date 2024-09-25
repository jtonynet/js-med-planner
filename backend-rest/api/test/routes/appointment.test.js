const { StatusCodes } = require('http-status-codes');
const request = require('supertest')
const { describe, it, beforeAll, afterAll } = require('@jest/globals')
const { patients, appointments } = require('../../models');
const app = require('../../app.js');

let server;
let bearerToken;

const patientsToCreate = [
  {
    "uuid": "cdc12e84-c821-42ba-aac6-979175126a36",
    "name": "Francisco Fernandez",
    "phone": "+553100101010",
    "email": "chicof@gmail.com",
    "birthDate": "1991-06-16",
    "gender": "male",
    "height": "1.65",
    "weight": "65.50"
  },
  {
    "uuid": "8234ae32-91d4-4a6b-91e6-376c7bf8003f",
    "name": "Venessa Volpato",
    "phone": "+553179797979",
    "email": "nessav@gmail.com",
    "birthDate": "1998-10-18",
    "gender": "female",
    "height": "1.67",
    "weight": "52.00"
  },
  {
    "uuid": "1973d488-8aa1-48c9-80a0-3a94ef3bedda",
    "name": "Sabrina Santori",
    "phone": "+553188769933",
    "email": "sabrinas@gmail.com",
    "birthDate": "1998-04-17",
    "gender": "female",
    "height": "1.67",
    "weight": "52.00"
  },
  {
    "uuid": "2cc68e7d-debc-4bde-ae5c-0a569fc97d85",
    "name": "Priscila Pires",
    "phone": "+553111111111",
    "email": "paulop@gmail.com",
    "birthDate": "1995-01-28",
    "gender": "other",
    "height": "1.73",
    "weight": "64.00"
  },
  {
    "uuid": "4aea82a4-a7ba-4a29-92cf-f21c764ddf96",
    "name": "Paciente Difícil de Encontrar Horário Para Agendar",
    "phone": "+553111111111",
    "email": "hardappointment@gmail.com",
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
    "startTime": "2025-12-20 15:20:00",
    "endTime": "2025-12-20 16:20:00"
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
    "startTime": "2025-12-20 12:10:00",
    "endTime": "2025-12-20 13:10:00"
  },
];

const conflictUpdateDates = [
  {
    "startTime": "2025-12-20 12:40:00",
    "endTime": "2025-12-20 13:40:00"
  },
  {
    "startTime": "2025-12-20 14:25:00",
    "endTime": "2025-12-20 15:25:00"
  },
  {
    "startTime": "2025-12-20 16:10:00",
    "endTime": "2025-12-20 17:10:00"
  },
];

const createDateOk = {
  "startTime": "2025-12-20 16:30:00",
  "endTime": "2025-12-20 17:30:00"
}


async function seed() {
  await patients.bulkCreate(patientsToCreate, { ignoreDuplicates: true });
}

function findByUUID(list, uuid) {
  return list.find(item => item.uuid === uuid);
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

describe('POST Authenticated in /patients/uuid/appointments', () => {
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
    [patientsToCreate[0].uuid],
    [patientsToCreate[1].uuid],
    [patientsToCreate[2].uuid],
    [patientsToCreate[3].uuid]
  ])('Should return a list of appointments to Patient UUID %s', async (patientUUID) => {
    const response = await request(app)
      .get(`/patients/${patientUUID}/appointments`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);

    const appointmentsPerPatient = 1;
    expect(response.body.length).toEqual(appointmentsPerPatient);
  });
});

describe('GET Authenticated in /appointments', () => {
  it(`Should get a appointment list by authorized Doctor ${patientToConflictAppointment.uuid}`, async () => {
    const response = await request(app)
      .get(`/appointments`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);


    expect(response.body.length)
      .toBeGreaterThanOrEqual(appointmentsToCreate.length);
  });
});

describe('POST Authenticated conflicts date time in /appointments/uuid/appointments', () => {
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

    expect(response.body.message).toEqual('Appointment(s) conflicting found');
  });
});

describe('PATCH Authenticated conflicts date time in /appointments/uuid', () => {
  it(`Should create a appointment  by patient UUID ${patientToConflictAppointment.uuid}`, async () => {
    const response = await request(app)
      .post(`/patients/${patientToConflictAppointment.uuid}/appointments`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .send({
        ...apointmentToConflict,
        ...createDateOk
      })
      .expect(StatusCodes.CREATED);

    expect(response.body.description).toEqual(apointmentToConflict.description);
  });

  test.each([
    [0, apointmentToConflict.uuid, apointmentToConflict, conflictUpdateDates],
    [1, apointmentToConflict.uuid, apointmentToConflict, conflictUpdateDates],
    [2, apointmentToConflict.uuid, apointmentToConflict, conflictUpdateDates]
  ])('Should conflict date time appointment %s on update by UUID %s',
    async (key, apointmentUUID, apointmentToConflict, conflictUpdateDates) => {
      const appointmentToTest = {
        ...apointmentToConflict,
        ...conflictUpdateDates[key]
      };

      const response = await request(app)
        .patch(`/appointments/${apointmentUUID}`)
        .set('Authorization', `Bearer ${bearerToken}`)
        .set('Accept', 'application.json')
        .send(appointmentToTest)
        .expect('content-type', /json/)
        .expect(StatusCodes.CONFLICT);

      expect(response.body.message).toEqual('Appointment(s) conflicting found');
    });
});

describe('DELETE Authenticated in /appointments/uuid', () => {
  it(`Should SOFT delete (paranoid) appointments by UUID ${apointmentToConflict.uuid}`, async () => {
    await request(app)
      .delete(`/appointments/${apointmentToConflict.uuid}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .expect(StatusCodes.NO_CONTENT);

    const deletedAppointment = await appointments.findOne({
      where: { uuid: apointmentToConflict.uuid },
      paranoid: false,
    });
    expect(deletedAppointment.deletedAt).not.toBeNull();
  });

  it(`Should return a list of appointments by patient UUID ${patientToConflictAppointment.uuid} is length zero`, async () => {
    const response = await request(app)
      .get(`/patients/${patientToConflictAppointment.uuid}/appointments`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);

    expect(response.body.length).toEqual(0);
  });
});

// CORNER CASES

const appointmentEndTimeGreaterStartTime = {
  uuid: '8e1d7569-af4a-4dcb-ab72-7c13f3bd437e',
  description: 'Primeira consulta da Tarde',
  startTime: '2031-12-20 18:30:00',
  endTime: '2031-12-20 17:00:00'
};

const appointmentToValidate = {
  uuid: '8e1d7569-af4a-4dcb-ab72-7c13f3bd437e',
  description: 'Primeira consulta da Tarde',
  startTime: '2031-12-20 17:00:00',
  endTime: '2031-12-20 18:30:00'
};

let fieldsToValidate = [
  ['uuid', { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }],
  ['description', { description: 'a' }],
  ['startTime', { startTime: '0000-00-00' }],
  ['endTime', { endTime: '0000-00-00' }]
];

describe('POST Authenticated return error on validate in /patients/uuid/appointments', () => {
  it(`Should return error on validate endTime is greater startTime in patient UUID ${patientToConflictAppointment.uuid}`,
    async () => {
      const response = await request(app)
        .post(`/patients/${patientToConflictAppointment.uuid}/appointments`)
        .set('Authorization', `Bearer ${bearerToken}`)
        .send(appointmentEndTimeGreaterStartTime)
        .expect(StatusCodes.BAD_REQUEST);

      expect(response.body.message).toEqual('Validation error(s) encountered');
      expect(response.body.errors[0].field).toEqual('endTime');
      expect(response.body.errors[1].field).toEqual('startTimeBeforeEndTime');
    });

  test.each(fieldsToValidate)(`Should return error on validate field %s at patient by UUID ${patientToConflictAppointment.uuid}`,
    async (key, param) => {
      let appointment = { ...appointmentToValidate };
      appointment[key] = param[key];

      const response = await request(app)
        .post(`/patients/${patientToConflictAppointment.uuid}/appointments`)
        .set('Authorization', `Bearer ${bearerToken}`)
        .send(appointment)
        .expect(StatusCodes.BAD_REQUEST);

      expect(response.body.message).toEqual('Validation error(s) encountered');
      expect(response.body.errors[0].field).toEqual(key);
    });

  test.each(fieldsToValidate)(`Should return error without field %s at patient by UUID ${patientToConflictAppointment.uuid}`,
    async (key) => {
      let appointment = { ...appointmentToValidate };
      delete appointment[key];

      const response = await request(app)
        .post(`/patients/${patientToConflictAppointment.uuid}/appointments`)
        .set('Authorization', `Bearer ${bearerToken}`)
        .send(appointment)
        .expect(StatusCodes.BAD_REQUEST);

      expect(response.body.message).toEqual('Validation error(s) encountered');
      expect(response.body.errors[0].field).toEqual(key);
    });
});

describe('PATCH Authenticated return error on validate in /patients/uuid/appointments', () => {
  it(`Should return error on validate field %s at patient by UUID ${patientToConflictAppointment.uuid}`, async () => {
    const response = await request(app)
      .post(`/patients/${patientToConflictAppointment.uuid}/appointments`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(appointmentToValidate)
      .expect(StatusCodes.CREATED);

    expect(response.body.description).toEqual(appointmentToValidate.description);
  });

  delete fieldsToValidate[0];

  test.each(fieldsToValidate)('Should conflict date time appointment %s on update by UUID %s',
    async (key, param) => {
      let appointment = { ...appointmentToValidate };
      appointment[key] = param[key];

      const response = await request(app)
        .patch(`/appointments/${appointment.uuid}`)
        .set('Authorization', `Bearer ${bearerToken}`)
        .set('Accept', 'application.json')
        .send(appointment)
        .expect('content-type', /json/)
        .expect(StatusCodes.BAD_REQUEST);

      expect(response.body.message).toEqual('Validation error(s) encountered');
      expect(response.body.errors[0].field).toEqual(key);
    });
});

describe('GET Authenticated with incorrect uuid patients/uuid/appointments', () => {
  it('Should return error validate appointment by incorrect patient UUID', async () => {
    const response = await request(app)
      .get('/patients/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/appointments')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.BAD_REQUEST);

    expect(response.body.message).toEqual('Request error invalid uuid');
  });
});

describe('PATCH Authenticated with incorrect uuid patients/uuid/appointments', () => {
  it('Should return error validate patient by incorrect UUID', async () => {
    const response = await request(app)
      .patch('/patients/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
      .set('Authorization', `Bearer ${bearerToken}`)
      .expect(StatusCodes.BAD_REQUEST);

    expect(response.body.message).toEqual('Request error invalid uuid');
  });
});

describe('DELETE Authenticated with incorrect uuid /patients/uuid', () => {
  it('Should return error validate patient by incorrect UUID', async () => {
    const response = await request(app)
      .delete('/patients/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
      .set('Authorization', `Bearer ${bearerToken}`)
      .expect(StatusCodes.BAD_REQUEST);

    expect(response.body.message).toEqual('Request error invalid uuid');
  });
});