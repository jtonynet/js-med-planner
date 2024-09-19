const { StatusCodes } = require('http-status-codes');
const request = require('supertest')
const { describe, it, beforeAll, afterAll } = require('@jest/globals')
const app = require('../../app.js');
const { doctors } = require('../../models');

let server;

beforeAll(async () => {
    const port = 3000;
    server = app.listen(port);
});

afterAll(async () => {
    server.close();
});

// UNDOCUMENTED FEATURE FOR TEST PUPOUSE
const doctorsToCreate = [
    {
        uuid: "21dd1c46-a6c2-44b9-a3a9-d3fa0438a12d",
        name: "Dr. Dolittle (o do Eddie Murphy pq é o q vale, não o Downey Jr.",
        email: "dolittle@md.com",
        password: "123456"
    }
];

describe('POST in /doctors', () => {
    test.each([
        [0, doctorsToCreate[0]],
    ])('Should create a doctor', async (key, doctor) => {
        const response = await request(app)
            .post('/doctors')
            .send(doctor)
            .expect(StatusCodes.CREATED);

        expect(response.body.email).toEqual(doctorsToCreate[key].email);

    });
});

