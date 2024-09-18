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

const uuidPatientToUpdateAndDelete = 'db7a27cc-69c4-46eb-ad0d-3166972bfbc9'

const patientsToCreate = [
  {
    uuid: uuidPatientToUpdateAndDelete,
    name: 'Pedro Prado',
    phone: '+551100000000',
    email: 'pedro@xmail.com',
    birth_date: '1990-05-15',
    gender: 'male',
    height: '1.75',
    weight: '72.50'
  },
  {
    uuid: '69be741b-3bf4-41a2-9b44-0e8b655a54dc',
    name: 'Felipe Feltrin',
    phone: '+552199999999',
    email: 'felipef@xmail.com',
    birth_date: '1970-12-25',
    gender: 'male',
    height: '1.60',
    weight: '80.00'
  }
]

patientToUpdateAndDelete = patientsToCreate[0]

const patientParamsToUpdate = {
  name: 'Paula Prado',
  phone: '+5521999998888',
  birth_date: '1980-05-15',
  gender: 'other',
  height: '1.80',
  weight: '55.00'
}

function findByUUID(patients, uuid) {
  return patients.find(patient => patient.uuid === uuid);
}

describe('POST in /patients', () => {
  test.each([
    [0, patientsToCreate[0]],
    [1, patientsToCreate[1]],
  ])('Should create a patient', async (key, patient) => {
    const response = await request(app)
      .post('/patients')
      .send(patient)
      .expect(StatusCodes.CREATED);

    expect(response.body.email).toEqual(patientsToCreate[key].email);

  });
});

describe('GET in /patients', () => {
  it('Should return a list of patients', async () => {
    const response = await request(app)
      .get('/patients')
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);

    expect(response.body.length).toEqual(patientsToCreate.length)

    patientToTest = findByUUID(response.body, uuidPatientToUpdateAndDelete)
    expect(patientToTest.email).toEqual(patientToUpdateAndDelete.email);
  });
});

describe('GET in /patients/uuid', () => {
  it('Should return one patient by UUID', async () => {
    const response = await request(app)
      .get(`/patients/${uuidPatientToUpdateAndDelete}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);
    expect(response.body.email).toEqual(patientToUpdateAndDelete.email);
  });
});


describe('PATCH /patients/:uuid', () => {
  test.each([
    ['name', { name: patientParamsToUpdate.name }],
    ['phone', { phone: patientParamsToUpdate.phone }],
    ['birth_date', { birth_date: patientParamsToUpdate.birth_date }],
    ['gender', { gender: patientParamsToUpdate.gender }],
    ['height', { height: patientParamsToUpdate.height }],
    ['weight', { weight: patientParamsToUpdate.weight }]
  ])('Should update field %s at one patient by UUID', async (key, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');

    await requisicao.request(app)
      .patch(`/patients/${uuidPatientToUpdateAndDelete}`)
      .send(param)
      .expect(StatusCodes.OK);

    const updatedPatient = await patients.findOne({
      where: { uuid: uuidPatientToUpdateAndDelete }
    });

    expect(updatedPatient.deletedAt).toBeNull();
    expect(updatedPatient[key]).toEqual(String(param[key]));

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE in /patients/:uuid', () => {
  it('Should soft delete and anonymize patient LGPD data by UUID', async () => {
    const response = await request(app)
      .delete(`/patients/${uuidPatientToUpdateAndDelete}`)
      .expect(StatusCodes.NO_CONTENT);

    const deletedPatient = await patients.findOne({
      where: { uuid: uuidPatientToUpdateAndDelete },
      paranoid: false,
    });

    expect(deletedPatient.deletedAt).not.toBeNull();

    expect(deletedPatient.name).not.toEqual(patientToUpdateAndDelete.name);
    expect(deletedPatient.email).not.toEqual(patientToUpdateAndDelete.email);
    expect(deletedPatient.phone).toBeNull();
    expect(deletedPatient.gender).toEqual('unspecified');
  });
});
