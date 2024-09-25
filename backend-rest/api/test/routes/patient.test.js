const { StatusCodes } = require('http-status-codes');
const request = require('supertest')
const { describe, it, beforeAll, afterAll } = require('@jest/globals')
const app = require('../../app.js');
const { patients } = require('../../models/index.js');

let server;
let bearerToken;

beforeAll(async () => {
  const port = 3000;
  server = app.listen(port);

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

const patientsToCreate = [
  {
    uuid: 'db7a27cc-69c4-46eb-ad0d-3166972bfbc9',
    name: 'Pedro Prado',
    phone: '551100000000',
    email: 'pedro@gmail.com',
    birthDate: '1990-05-15',
    gender: 'male',
    height: '1.75',
    weight: '72.50'
  },
  {
    uuid: '69be741b-3bf4-41a2-9b44-0e8b655a54dc',
    name: 'Felipe Feltrin',
    phone: '552199999999',
    email: 'felipef@gmail.com',
    birthDate: '1970-12-25',
    gender: 'male',
    height: '1.60',
    weight: '80.00'
  },
  {
    uuid: 'bd5afa01-91a6-4b7a-8fee-bb98f5ed47a7',
    name: 'Carolina Karla',
    phone: '5521420420420',
    email: 'carolinak@gmail.com',
    birthDate: '1995-12-25',
    gender: 'female',
    height: '1.65',
    weight: '50'
  }
]

patientToUpdateAndDelete = patientsToCreate[0]

const patientParamsToUpdate = {
  name: 'Paula Prado',
  phone: '5521999998888',
  birthDate: '1980-05-15',
  gender: 'other',
  height: '1.80',
  weight: '55.00'
}

function findByUUID(list, uuid) {
  return list.find(item => item.uuid === uuid);
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
  it('Should return a list of patients', async () => {
    const response = await request(app)
      .get('/patients')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);

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

describe('PATCH Authenticated /patients/uuid', () => {
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
    const responseBeforeDelete = await request(app)
      .get('/patients')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);

    const patientsLengthBeforeDelete = responseBeforeDelete.body.length;

    let patientDeletedInResponse = findByUUID(responseBeforeDelete.body, patientToUpdateAndDelete.uuid)
    expect(patientDeletedInResponse).not.toBeUndefined();

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
    expect(deletedPatient.phone).not.toEqual(patientToUpdateAndDelete.phone);
    expect(deletedPatient.gender).toEqual('unspecified');
    expect(deletedPatient.birthDate).toEqual(dateOfBrazilianDiscovery);
    expect(deletedPatient.height).not.toEqual(decimalMinimun);
    expect(deletedPatient.weight).not.toEqual(decimalMinimun);

    const responseAfterDelete = await request(app)
      .get('/patients')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.OK);

    expect(responseAfterDelete.body.length).toEqual(patientsLengthBeforeDelete - 1);

    patientDeletedInResponse = findByUUID(responseAfterDelete.body, patientToUpdateAndDelete.uuid)
    expect(patientDeletedInResponse).toBeUndefined();
  });

  it('Should return not found to delete twice by UUID', async () => {
    await request(app)
      .delete(`/patients/${patientToUpdateAndDelete.uuid}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .expect(StatusCodes.NOT_FOUND);
  });
});

// CORNER CASES

const patientToValidate =
{
  uuid: '5c351098-3a95-42a1-bdff-b6345803ca3f',
  name: 'Pedro Prado',
  phone: '551100000000',
  email: 'pedro@gmail.com',
  birthDate: '1990-05-15',
  gender: 'male',
  height: '1.75',
  weight: '72.50'
};

const fieldsToValidate = [
  ['name', { name: 'a' }],
  ['phone', { phone: '0' }],
  ['birthDate', { birthDate: '9999-12-31' }],
  ['gender', { gender: 'gender_not_in_enum' }],
  ['height', { height: '00.00' }],
  ['weight', { weight: '00.00' }]
];

describe('POST Authenticated validate fields errors in /patients', () => {
  test.each(fieldsToValidate)(`Should return error on validate field %s at patient by UUID ${patientToValidate.uuid}`, async (key, param) => {
    let patient = { ...patientToValidate };
    patient[key] = param[key];

    const response = await request(app)
      .post('/patients')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(patient)
      .expect(StatusCodes.BAD_REQUEST);

    expect(response.body.message).toEqual('Validation error(s) on request encountered');
  });

  it('Should create a patient', async () => {
    const response = await request(app)
      .post('/patients')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(patientToValidate)
      .expect(StatusCodes.CREATED);

    expect(response.body.email).toEqual(patientToValidate.email);
  });
});

describe('PATCH Authenticated validate fields errors in /patients', () => {
  test.each(fieldsToValidate)(`Should return error on validate field %s at patient by UUID ${patientToValidate.uuid}`, async (key, param) => {
    let patient = { ...patientToValidate };
    patient[key] = param[key];

    const response = await request(app)
      .patch(`/patients/${patientToValidate.uuid}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(patient)
      .expect(StatusCodes.BAD_REQUEST);

    expect(response.body.message).toEqual('Validation error(s) on request encountered');
  });
});

describe('GET Authenticated with incorrect uuid /patients/uuid', () => {
  it('Should return error validate patient by incorrect UUID', async () => {
    const response = await request(app)
      .get('/patients/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.BAD_REQUEST);

    expect(response.body.message).toEqual('Validation error on uuid encountered');
  });
});

describe('PATCH Authenticated with incorrect uuid /patients/uuid', () => {
  it('Should return error validate patient by incorrect UUID', async () => {
    const response = await request(app)
      .patch('/patients/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(patientToValidate)
      .expect(StatusCodes.BAD_REQUEST);

    expect(response.body.message).toEqual('Validation error on uuid encountered');
  });
});

describe('DELETE Authenticated with incorrect uuid /patients/uuid', () => {
  it('Should return error validate patient by incorrect UUID', async () => {
    const response = await request(app)
      .delete('/patients/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application.json')
      .expect('content-type', /json/)
      .expect(StatusCodes.BAD_REQUEST);

    expect(response.body.message).toEqual('Validation error on uuid encountered');
  });
});
