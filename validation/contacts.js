const Joi = require('joi')
const { HttpCode, messages } = require('../helpers/constants')
const mongoose = require('mongoose')

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string().min(7).max(17).optional(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string().min(7).max(17).optional(),
}).or('name', 'email', 'phone')

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
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
  validationCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next)
  },
  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
  },
  validationUpdateStatusContact: (req, res, next) => {
    return validate(schemaUpdateStatusContact, req.body, next)
  },
  validationMongoId: (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return next({
      status: HttpCode.BAD_REQUEST,
      message: messages.INVALID_OBJ_ID,
      data: 'Bad Request'
      })
    }
    next()
  },
}