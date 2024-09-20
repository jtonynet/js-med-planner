const { StatusCodes } = require('http-status-codes');
const request = require('supertest')
const { describe, it, beforeAll, afterAll } = require('@jest/globals')
const app = require('../../app.js');
const { patients } = require('../../models');

let server;
let bearerToken;

beforeAll(async () => {
  const port = 3000;
  server = app.listen(port);

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

const patientsToCreate = [
  {
    uuid: 'db7a27cc-69c4-46eb-ad0d-3166972bfbc9',
    name: 'Pedro Prado',
    phone: '+551100000000',
    email: 'pedro@xmail.com',
    birthDate: '1990-05-15',
    gender: 'male',
    height: '1.75',
    weight: '72.50'
  },
  {
    uuid: '69be741b-3bf4-41a2-9b44-0e8b655a54dc',
    name: 'Felipe Feltrin',
    phone: '+552199999999',
    email: 'felipef@xmail.com',
    birthDate: '1970-12-25',
    gender: 'male',
    height: '1.60',
    weight: '80.00'
  },
  {
    uuid: 'bd5afa01-91a6-4b7a-8fee-bb98f5ed47a7',
    name: 'Carolina Karla',
    phone: '+5521420420420',
    email: 'carolinak@xmail.com',
    birthDate: '1995-12-25',
    gender: 'female',
    height: '1.65',
    weight: '50'
  }
]

patientToUpdateAndDelete = patientsToCreate[0]

const patientParamsToUpdate = {
  name: 'Paula Prado',
  phone: '+5521999998888',
  birthDate: '1980-05-15',
  gender: 'other',
  height: '1.80',
  weight: '55.00'
}

function findByUUID(patients, uuid) {
  return patients.find(patient => patient.uuid === uuid);
}

describe('POST Authenticated in /patients', () => {
  test.each([
    [0, patientsToCreate[0]],
    [1, patientsToCreate[1]],
    [2, patientsToCreate[2]],
  ])('Should create a patient', async (key, patient) => {
    const response = await request(app)
      .post('/patients')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(patient)
      .expect(StatusCodes.CREATED);

    expect(response.body.email).toEqual(patientsToCreate[key].email);

  });
});

describe('GET Authenticated in /patients', () => {
  it('Should return a list of patients with length equal a three', async () => {
    const response = await request(app)
      .get('/patients')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);

    expect(response.body.length).toEqual(patientsToCreate.length)

    patientToTest = findByUUID(response.body, patientToUpdateAndDelete.uuid)
    expect(patientToTest.email).toEqual(patientToUpdateAndDelete.email);
  });
});

describe('GET Authenticated in /patients/uuid', () => {
  it('Should return one patient by UUID', async () => {
    const response = await request(app)
      .get(`/patients/${patientToUpdateAndDelete.uuid}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);
    expect(response.body.email).toEqual(patientToUpdateAndDelete.email);
  });
});

describe('PATCH Authenticated /patients/:uuid', () => {
  test.each([
    ['name', { name: patientParamsToUpdate.name }],
    ['phone', { phone: patientParamsToUpdate.phone }],
    ['birthDate', { birthDate: patientParamsToUpdate.birthDate }],
    ['gender', { gender: patientParamsToUpdate.gender }],
    ['height', { height: patientParamsToUpdate.height }],
    ['weight', { weight: patientParamsToUpdate.weight }]
  ])('Should update field %s at one patient by UUID', async (key, param) => {
    await request(app)
      .patch(`/patients/${patientToUpdateAndDelete.uuid}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(param)
      .expect(StatusCodes.OK);

    const updatedPatient = await patients.findOne({
      where: { uuid: patientToUpdateAndDelete.uuid }
    });

    expect(updatedPatient.deletedAt).toBeNull();
    expect(updatedPatient[key]).toEqual(String(param[key]));
  });
});

describe('DELETE Authenticated in /patients/:uuid', () => {
  it('Should SOFT delete (paranoid) and anonymize patient LGPD data by UUID', async () => {
    await request(app)
      .delete(`/patients/${patientToUpdateAndDelete.uuid}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .expect(StatusCodes.NO_CONTENT);

    const deletedPatient = await patients.findOne({
      where: { uuid: patientToUpdateAndDelete.uuid },
      paranoid: false,
    });

    expect(deletedPatient.deletedAt).not.toBeNull();

    // TODO: move to constants values of patient. Anonymize purpouses
    const decimalMinimun = '00.01';
    const dateOfBrazilianDiscovery = '1500-04-22';

    expect(deletedPatient.name).not.toEqual(patientToUpdateAndDelete.name);
    expect(deletedPatient.email).not.toEqual(patientToUpdateAndDelete.email);
    expect(deletedPatient.phone).toBeNull();
    expect(deletedPatient.gender).toEqual('unspecified');
    expect(deletedPatient.birthDate).toEqual(dateOfBrazilianDiscovery);
    expect(deletedPatient.height).not.toEqual(decimalMinimun);
    expect(deletedPatient.weight).not.toEqual(decimalMinimun);
  });

  it('Should return a list of patients with length equal a two', async () => {
    const response = await request(app)
      .get('/patients')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);

    expect(response.body.length).toEqual(2) // IMHO Magic number is valid just in case, semantic test suit
  });
});
