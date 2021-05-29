const Contact = require('../model/contactShema')

const getAllContacts = async () => {
  try {
    const allContacts = await Contact.find({})
    return allContacts
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const findedContact = await Contact.findOne({ _id: contactId })
    return findedContact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const deletedContact = await Contact.findOneAndRemove({ _id: contactId })
    return deletedContact
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body)
    return newContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    )
    return updatedContact
  } catch (error) {
    console.log(error)
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
      const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    )
    return updatedContact
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
