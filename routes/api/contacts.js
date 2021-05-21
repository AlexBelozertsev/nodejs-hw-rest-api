const express = require('express')
const router = express.Router()
const Contacts = require('../../model')
const { HttpCode } = require('../../helpers/constants')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.getAllContacts()
    return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { contacts } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params)
    if (contact) {
      return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { contact } })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Contact Not Found',
        data: 'Not Found'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(HttpCode.CREATED).json({ status: 'success', code: HttpCode.CREATED, data: { contact } })
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params)
    if (contact) {
      return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { contact } })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Contact Not Found',
        data: 'Not Found'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.id, req.body)
    if (contact) {
      return res.json({ status: 'success', code: HttpCode.OK, data: { contact } })
    }
    return res.json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
  } catch (e) {
    next(e)
  }
})

module.exports = router
