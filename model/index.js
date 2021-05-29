const db = require('../db')
const { ObjectId } = require('mongodb')
const { HttpCode } = require('../helpers/constants')
const { ErrorHandler } = require('../helpers/errorHandler')

const getContacts = async (db, name) => {
  const client = await db
  const collection = client.db().collection(name)
  return collection
}

const getMongoId = id => {
  try {
    return new ObjectId(id)
  } catch (error) {
    throw new ErrorHandler(
      HttpCode.BAD_REQUEST,
      `MongoDb _id: ${error.message}`,
      `Bad Request`
    )
  }
}

const getAllContacts = async () => {
  try {
    const contactsCollection = await getContacts(db, 'contacts')
    const allContacts = await contactsCollection.find({}).toArray()
    return allContacts
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contactsCollection = await getContacts(db, 'contacts')
    const objectId = getMongoId(contactId)
    const [findedContact] = await contactsCollection.find({ _id: objectId }).toArray()
    return findedContact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const contactsCollection = await getContacts(db, 'contacts')
    const objectId = getMongoId(contactId)
    const {value: deletedContact} = await contactsCollection.findOneAndDelete({ _id: objectId })
    return deletedContact
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const contactsCollection = await getContacts(db, 'contacts')
    const contactNew = {...body}
    const {ops: [newContactsList]} = await contactsCollection.insertOne(contactNew)
    return newContactsList
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contactsCollection = await getContacts(db, 'contacts')
    const objectId = getMongoId(contactId)
    const {value: updatedContact} = await contactsCollection.findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnOriginal: false }
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
}
