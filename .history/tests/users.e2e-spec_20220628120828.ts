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
        expect(res.body.jwt).not.toBeUndefined()
    })

    it('Login - error', async () => {
        const res = await request(application.app).post('/users/login').send({ email: 'makak@gmail.com', password: '1' })
        expect(res.statusCode).toBe(200)
    })

    it('Info - sucsess', async () => {
        const login = await (await request(application.app).post('/users/login').send({ email: 'maka@gmail.com', password: '139', name: 'name2' })).body
        const res = await request(application.app).get('/users/info').set('Authorization', `Baarer ${login}`)
        expect(res.body).toBe('maka@gmail.com')
    })

    it('Info - error', async () => {
        const res = await request(application.app).get('/users/info').set('Authorization', `Baarer 1`)
        expect(res.statusCode).toBe(401)
    })
})

afterAll(() => {
    application.close()
})