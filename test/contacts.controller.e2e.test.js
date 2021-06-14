const request = require('supertest')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = require('../app')
const db = require('../db')
const User = require('../model/userShema')
const Contact = require('../model/contactShema')
const Users = require('../repositories/users')
const { newContact, newUser } = require('./data/data')
const { HttpCode } = require('../helpers/constants')

describe('Test route contacts', () => {
  let user, token
  beforeAll(async () => {
    await db
    await User.deleteOne({ email: newUser.email })
    user = await User.create(newUser)
    const SECRET_KEY = process.env.SECRET_KEY
    const issueToken = (payload, secret) => jwt.sign(payload, secret)
    token = issueToken({ id: user._id }, SECRET_KEY)
    await Users.updateToken(user._id, token)
  })

  afterAll(async () => {
    const mongo = await db
    await User.deleteOne({ email: newUser.email })
    await mongo.disconnect()
  })

  beforeEach(async () => {
    await Contact.deleteMany({})
  })

  describe('GET request', () => {
    test('should return status 200 for get all contacts', async () => {
      const response = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toEqual(HttpCode.OK)
      expect(response.body).toBeDefined()
      expect(response.body.data.contacts).toBeInstanceOf(Array)
    })
      
    test('should return status 200 get contact by id', async () => {
      const contact = await Contact.create({ ...newContact, owner: user._id })
      const response = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toEqual(HttpCode.OK)
      expect(response.body).toBeDefined()
      expect(response.body.data.contact).toHaveProperty('_id')
      expect(response.body.data.contact._id).toBe(String(contact._id))
    })
      
    test('should return status 404 get contact wrong id', async () => {
      const fakeId = '60ad371ee5c5131384447a75'
      const response = await request(app)
        .get(`/api/cats/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toEqual(HttpCode.NOT_FOUND)
      expect(response.body).toBeDefined()
    })

    test('should return status 404 get cat without id', async () => {
      const emptyId = ''
      const response = await request(app)
        .get(`/api/cats/${emptyId}`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toEqual(HttpCode.NOT_FOUND)
      expect(response.body).toBeDefined()
    })
  })
    
  describe('POST request', () => {
    test('should return status 201 create contact', async () => {
      const response = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send(newContact)
        .set('Accept', 'application/json')

      expect(response.status).toEqual(HttpCode.CREATED)
      expect(response.body).toBeDefined()
    })
  })

  describe('PUT request', () => {
    test('should return status 200 change contact', async () => {
      const contact = await Contact.create({ ...newContact, owner: user._id })
      const response = await request(app)
        .put(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({name: 'Jack'})
        .set('Accept', 'application/json')

      expect(response.status).toEqual(HttpCode.OK)
      expect(response.body).toBeDefined()
    })
  })

  describe('PATCH request', () => {
    test('should return status 200 update contact', async () => {
      const contact = await Contact.create({ ...newContact, owner: user._id })
      const response = await request(app)
        .patch(`/api/contacts/${contact._id}/favorite`)
        .set('Authorization', `Bearer ${token}`)
        .send({favorite: true})
        .set('Accept', 'application/json')

      expect(response.status).toEqual(HttpCode.OK)
      expect(response.body).toBeDefined()
    })
  })
  
  describe('DELETE request', () => {
    test('should return status 200 delete contact', async () => {
      const contact = await Contact.create({ ...newContact, owner: user._id })
      const response = await request(app)
        .delete(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toEqual(HttpCode.OK)
      expect(response.body).toBeDefined()
    })
  })
})
