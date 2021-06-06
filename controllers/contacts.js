const { HttpCode, messages } = require('../helpers/constants')
const Contacts = require('../repositories/contacts')

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { docs:contacts, ...rest } = await Contacts.getAllContacts(userId, req.query)
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contacts, ...rest } })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.getContactById(userId, req.params.contactId)
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { contact } })
    } else {
      return res
        .status(HttpCode.NOT_FOUND)
        .json({
          status: 'error',
          code: HttpCode.NOT_FOUND,
          message: messages.NOT_FOUND,
          data: 'Not Found'
        })
    }
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.addContact(userId, req.body)
    if (contact) {
      return res
        .status(HttpCode.CREATED)
        .json({ status: 'success', code: HttpCode.CREATED, data: { contact } })
    } else {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json({
          status: 'error',
          code: HttpCode.BAD_REQUEST,
          message: messages.BAD_REQUEST,
          data: 'missing required name field'
      })
    }
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.removeContact(userId, req.params.contactId)
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({
          status: 'success',
          code: HttpCode.OK,
          message: messages.REMOVE,
          data: { contact }
      })
    } else {
      return res
        .status(HttpCode.NOT_FOUND)
        .json({
          status: 'error',
          code: HttpCode.NOT_FOUND,
          message: messages.NOT_FOUND,
          data: 'Not Found'
        })
    }
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    if (req.body) {
      const contact = await Contacts.updateContact(userId, req.params.contactId, req.body)
      if (contact) {
        return res
          .status(HttpCode.OK)
          .json({ status: 'success', code: HttpCode.OK, data: { contact } })
      }
      return res
        .status(HttpCode.NOT_FOUND)
        .json({
          status: 'error',
          code: HttpCode.NOT_FOUND,
          message: messages.NOT_FOUND,
          data: 'Not Found'
        })
    } else {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json({
          status: 'error',
          code: HttpCode.BAD_REQUEST,
          message: messages.BAD_REQUEST,
          data: 'missing fields'
      })
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