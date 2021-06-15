const guard = require('../helpers/guard')
const { HttpCode, messages } = require('../helpers/constants')
const passport = require('passport')

describe('Unit test guard', () => {
  const user = { token: 'randomsFigures' }
  const req = { get: jest.fn((header) => `Bearer ${user.token}`), user }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  }
  const next = jest.fn()

  test('user exist', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => {
        cb(null, user)
      },
    )
    guard(req, res, next)
    expect(req.get).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  test('user not exist', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => {
        cb(null, false)
      },
    )
    guard(req, res, next)
    expect(req.get).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalled()
    expect(res.json).toHaveReturnedWith({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: messages.UNAUTHORIZED,
    })
  })

  test('user wrong token', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => {
        cb(null, { token: '2345' })
      },
    )
    guard(req, res, next)
    expect(req.get).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalled()
    expect(res.json).toHaveReturnedWith({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: messages.UNAUTHORIZED,
    })
  })
})