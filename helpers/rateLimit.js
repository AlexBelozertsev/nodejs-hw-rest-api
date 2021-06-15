const rateLimit = require('express-rate-limit')
const {HttpCode, limits, messages} = require('./constants')

const createAccountLimiter = rateLimit({
  windowMs: limits.LIMIT_CREATE_ACC_TIME,
    max: limits.LIMIT_CREATE_REQUEST,
    handler: (req, res, next) => {
    return res
      .status(HttpCode.TOO_MANY_REQUESTS)
      .json({
        status: 'error',
        code: HttpCode.TOO_MANY_REQUESTS,
        message: messages.TOO_MANY_REQUESTS,
    })
  },
})

const limiterAPI = {
  windowMs: limits.LIMIT_TIME,
  max: limits.LIMIT_REQUEST,
  handler: (req, res, next) => {
    return res
      .status(HttpCode.TOO_MANY_REQUESTS)
      .json({
        status: 'error',
        code: HttpCode.TOO_MANY_REQUESTS,
        message: messages.TOO_MANY_REQUESTS,
    })
  },
}


module.exports = {createAccountLimiter, limiterAPI}