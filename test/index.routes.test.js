const server = require('../server/index');
const request = require('supertest');

afterEach(() => {
    server.close();
});

describe('#routes: index', () => {
    test('should respond with a 200', async () => {
        const res = await request(server).get('/');

        expect(res.status).toEqual(200);
        expect(res.type).toEqual('application/json');
        expect(res.body.data).toEqual('hello world');
    });
});
