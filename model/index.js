const fs = require('fs/promises')
const path = require('path')
const shortid = require('shortid')

const contactsList = path.join(__dirname, '/contacts.json')

async function getContacts() {
  const data = await fs.readFile(contactsList, 'utf-8')
  return JSON.parse(data)
}

function writeNewList(initialList, newList) {
  return fs.writeFile(
    initialList,
    JSON.stringify(newList, null, '\t'),
    'utf-8',
    (err) => { if (err) console.error(err) }
  )
}

const getAllContacts = async () => {
  try {
    return await getContacts()
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts()
    const [findedContact] = contacts.filter(contact => contact.id === contactId)
    return findedContact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await getContacts()
    const index = contacts.findIndex(contact => contact.id === contactId)
    if (index !== -1) {
      const result = contacts.splice(index, 1)
      await writeNewList(contactsList, contacts)
      return result
    }
    return null
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const contacts = await getContacts()
    const contactNew = {
      id: shortid.generate(),
      ...body,
    }
    const newContactsList = [contactNew, ...contacts]
    await writeNewList(contactsList, newContactsList)
    return contactNew
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await getContacts()
    const findedContact = contacts.find(contact => contact.id === contactId)
    if (findedContact) {
      Object.assign(findedContact, body)
      await writeNewList(contactsList, contacts)
    }
    return findedContact
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
