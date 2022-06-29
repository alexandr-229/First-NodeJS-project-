import { App } from "../src/app";
import { boot } from "../src/main";
import request from 'supertest'

let application: App;

beforeAll( async() => {
    const { app } = await boot;
    application = app
})

describe('users e2e', () => {
    it('Register error', async () => {
        const res = await request(application.app).post('/users/register').send({ email: 'q@gmail.com', password: '1234' })
        expect(res.statusCode).toBe(422)
    })

    it('Login - sucsess', async () => {
        const res = await request(application.app).post('/users/login').send({ email: 'makak@gmail.com', password: '132' })
        expect(res.statusCode).toBe(422)
    })
})

afterAll(() => {
    application.close()
})