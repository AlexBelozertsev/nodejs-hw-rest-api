const Users = require('../repositories/users')
const { HttpCode } = require('../helpers/constants')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
      return res
        .status(HttpCode.CONFLICT)
        .json({
          status: 'error',
          code: HttpCode.CONFLICT,
          message: 'Email in use',
      })
    }
    const { id, email, subscription } = await Users.createUser(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { id, email, subscription },
    })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    const {email, subscription} = user
    const isValidPassword = await user?.isValidPassword(req.body.password)
    if (!user || !isValidPassword) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong',
      })
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
    await Users.updateToken(id, token)
    return res
      .status(HttpCode.OK)
      .json({
        status: 'success',
        code: HttpCode.OK,
        data: { token, email, subscription }
      })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
  } catch (error) {
    next(error)
  }
}

const current = async (req, res, next) => {
  try {
    const {email, subscription} = req.user
    return res
      .status(HttpCode.OK)
      .json({
        status: 'success',
        code: HttpCode.OK,
        data: { email, subscription }
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.user.id
    if (req.body) {
      const user = await Users.updateUserSubscription(userId, req.body)
    const {name, email, subscription} = user
      if (user) {
        return res
          .status(HttpCode.OK)
          .json({ status: 'success', code: HttpCode.OK, data: { name, email, subscription } })
      }
      return res
        .status(HttpCode.NOT_FOUND)
        .json({
          status: 'error',
          code: HttpCode.NOT_FOUND,
          message: 'error: User Not Found',
          data: 'Not Found'
        })
    } else {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json({
          status: 'error',
          code: HttpCode.BAD_REQUEST,
          message: 'error: missing field',
          data: 'missing field'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, logout, current, update }
