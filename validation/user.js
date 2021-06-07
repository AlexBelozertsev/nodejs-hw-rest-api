const Joi = require('joi')
const { HttpCode, Subscription } = require('../helpers/constants')

const schemaUserRegistration = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().alphanum().min(6).max(25).required(),
  subscription: Joi.any()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS).optional(),
})

const schemaUserLogin = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().alphanum().min(6).max(25).required(),
})

const schemaUpdateUserSubscription = Joi.object({
  subscription: Joi.any()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS).required(),
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