const Contact = require('../model/contactShema')
const { limits } = require('../helpers/constants')

const getAllContacts = async (userId, query) => {
  try {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = false,
    limit = limits.LIMIT_CONTACTS,
    page = 1,
  } = query

  const optionsSearch = { owner: userId }
  if (favorite) {
    optionsSearch.favorite = favorite
  }
  const allContacts = await Contact.paginate(optionsSearch, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? {filter: [favorite]} : '',
    populate: { path: 'owner', select: 'name email subscription -_id' },
  })
    return allContacts
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (userId, contactId) => {
  try {
    const findedContact = await Contact.findOne({_id: contactId, owner: userId }).populate({
      path: 'owner',
      select: 'name email subscription'
        })
    return findedContact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (userId, contactId) => {
  try {
    const deletedContact = await Contact.findOneAndRemove({_id: contactId, owner: userId })
    return deletedContact
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (userId, body) => {
  try {
    const newContact = await Contact.create({owner: userId, ...body})
    return newContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (userId, contactId, body) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
      { ...body },
      { new: true }
    ).populate({
      path: 'owner',
      select: 'name email subscription'
        })
    return updatedContact
  } catch (error) {
    console.log(error)
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
      const updatedStatus = await Contact.findByIdAndUpdate(
      contactId,
      { ...body },
      { new: true }
    )
    return updatedStatus
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
