const express = require('express')
const router = express.Router()
const controller = require('../../controllers/contacts')
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationMongoId
} = require('../../validation/contacts')

router
  .get('/', controller.getAllContacts)
  .post('/', validationCreateContact, controller.addContact)

router
  .get('/:contactId', validationMongoId, controller.getContactById)
  .put('/:contactId', validationMongoId, validationUpdateContact, controller.updateContact )
  .delete('/:contactId', validationMongoId, controller.removeContact )

router.patch('/:contactId/favorite', validationMongoId, validationUpdateStatusContact, controller.updateContact )

module.exports = router
