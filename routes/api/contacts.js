const express = require('express')
const router = express.Router()
const controller = require('../../controllers/contacts')
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationMongoId
} = require('../../validation/contacts')

router.get('/', controller.getAllContacts)

router.get('/:contactId',validationMongoId, controller.getContactById )

router.post('/', validationCreateContact, controller.addContact )

router.delete('/:contactId', validationMongoId, controller.removeContact )

router.put('/:contactId', validationMongoId, validationUpdateContact, controller.updateContact )

router.patch('/:contactId/favorite', validationUpdateStatusContact, controller.updateContact )

module.exports = router
