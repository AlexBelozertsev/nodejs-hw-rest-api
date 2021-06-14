const request = require('supertest')
const fs = require('fs/promises')
require('dotenv').config()
const app = require('../app')
const db = require('../db')
const User = require('../model/userShema')
const { newTestUser } = require('./data/data')
const { HttpCode } = require('../helpers/constants')

jest.mock('cloudinary')

describe('Test route users', () => {
  let token
  beforeAll(async () => {
    await db
    await User.deleteOne({ email: newTestUser.email })
  })

  afterAll(async () => {
    const mongo = await db
    await User.deleteOne({ email: newTestUser.email })
    await mongo.disconnect()
  })

  test('Register User', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send(newTestUser)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(HttpCode.CREATED)
    expect(response.body).toBeDefined()
  })
    
  test('Creating an existing User', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send(newTestUser)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(HttpCode.CONFLICT)
    expect(response.body).toBeDefined()
  })
    
    test('Login User', async () => {
        const {email, password} = newTestUser
        const response = await request(app)
            .post('/api/users/login')
            .send({email, password})
            .set('Accept', 'application/json')
        expect(response.status).toEqual(HttpCode.OK)
        expect(response.body).toBeDefined()
        token = response.body.data.token
    })
    
    test('Empty Login User', async () => {
        const response = await request(app)
        .post('/api/users/login')
        .send()
        .set('Accept', 'application/json')
        expect(response.status).toEqual(HttpCode.BAD_REQUEST)
        expect(response.body).toBeDefined()
    })

    test('Upload Avatar User', async () => {
        const buf = await fs.readFile('./test/data/avatar-female.jpg')
        const response = await request(app)
            .patch('/api/users/avatars')
            .set('Authorization', `Bearer ${token}`)
            .attach('avatar', buf, 'avatar-female.jpg')
        expect(response.status).toEqual(HttpCode.OK)
        expect(response.body).toBeDefined()
        expect(response.body.data.avatarUrl).toEqual('secure_url')
    })
})
