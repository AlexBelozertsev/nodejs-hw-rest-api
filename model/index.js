const fs = require('fs/promises')
const path = require('path')
const shortid = require('shortid')

const contacts = path.join(__dirname, '/contact.json')

async function getContacts() {
  const data = await fs.readFile(path.join(__dirname, contacts), 'utf-8')
  return JSON.parse(data)
}
const getAllContacts = async () => {
  return await getContacts()
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
