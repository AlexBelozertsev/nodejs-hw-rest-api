const express = require('express')
const router = express.Router()
const controller = require('../../controllers/contacts')
const guard = require('../../helpers/guard')
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationMongoId
} = require('../../validation/contacts')

router
  .get('/', guard, controller.getAllContacts)
  .post('/', guard, validationCreateContact, controller.addContact)

router
  .get('/:contactId', guard, validationMongoId, controller.getContactById)
  .put('/:contactId', guard, validationMongoId, validationUpdateContact, controller.updateContact )
  .delete('/:contactId', guard, validationMongoId, controller.removeContact )

router.patch('/:contactId/favorite', guard, validationMongoId, validationUpdateStatusContact, controller.updateContact )

module.exports = router
