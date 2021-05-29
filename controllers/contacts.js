const { HttpCode } = require('../helpers/constants')
const { ErrorHandler } = require('../helpers/errorHandler')
const Contacts = require('../repositories/contacts')

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contacts.getAllContacts()
        return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { contacts } })
    } catch (error) {
        next(error)
    }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      console.log(contact);
      return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { contact } })
    } else {
      return new ErrorHandler(
        HttpCode.NOT_FOUND,
        `error: Contact Not Found`,
        'Not Found'
      )
    }
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    if (contact) {
      return res.status(HttpCode.CREATED).json({
        status: 'success', code: HttpCode.CREATED, data: { contact }
      })
    } else {
      return new ErrorHandler(
        HttpCode.BAD_REQUEST,
        'error: missing required name field',
        'missing required name field'
      )
    }
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success', code: HttpCode.OK, message: 'contact deleted', data: { contact }
      })
    } else {
      return new ErrorHandler(
        HttpCode.NOT_FOUND,
        `error: Contact Not Found`,
        'Not Found'
      )
    }
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    if (req.body) {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { contact } })
      }
      return new ErrorHandler(
        HttpCode.NOT_FOUND,
        `error: Contact Not Found`,
        'Not Found'
      )
    } else {
      return new ErrorHandler(
        HttpCode.BAD_REQUEST,
        'missing fields',
        'missing fields'
      )
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
}