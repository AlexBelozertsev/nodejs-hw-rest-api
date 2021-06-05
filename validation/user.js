const Joi = require('joi')
const { HttpCode } = require('../helpers/constants')
const regExp = '^[a-zA-Z0-9]$'

const schemaUserRegistration = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).optional(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    password: Joi.string().min(6).pattern(new RegExp(regExp)).required(),
})

const schemaUserLogin = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    password: Joi.string().min(6).pattern(new RegExp(regExp)).required(),
})

const schemaUpdateUserSubscription = Joi.object({
  subscription: Joi.any().valid('starter', 'pro', 'business').required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${err.message.replace(/"/g, '')}`,
      data: 'Bad Request'
    })
  }
}

module.exports = {
  validationRegistrationUser: (req, res, next) => {
    return validate(schemaUserRegistration, req.body, next)
  },
  validationUserLogin: (req, res, next) => {
    return validate(schemaUserLogin, req.body, next)
  },
  validationUserSubscription: (req, res, next) => {
    return validate(schemaUpdateUserSubscription, req.body, next)
  },
}