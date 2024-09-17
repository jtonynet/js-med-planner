import request from 'supertest';
import {
    describe, expect, it,
} from '@jest/globals';
import app from '../../app.js';

let server;
beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('GET in /patients', () => {
    it('Should return patients list', async () => {
        const response = await request(app)
            .get('/patients')
            .set('Accept', 'application.json')
            .expect('content-type', /json/)
            .expect(200);

        expect(response.body[0].email).toEqual('jonh.doe@test.com');
    });
});