const { getAllContacts, getContactById, addContact, removeContact, updateContact } = require('../controllers/contacts')
const Contacts = require('../repositories/contacts')
const { HttpCode, messages } = require('../helpers/constants')

jest.mock('../repositories/contacts')


describe('Unit test controller contacts', () => {
    const req = { user: { id: 1 } }
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
    }
    const next = jest.fn()
    const contacts = [{
        "favorite": false,
        "_id": "60b201e07cd92b1c88fa3f61",
        "name": "Allen Raymond",
        "email": "nulla.ante@vestibul.co.uk",
        "phone": "(992) 914-3792"
        },
        {
        "favorite": true,
        "_id": "60b201e07cd92b1c88fa3f62",
        "name": "Chaim Lewis",
        "email": "dui.in@egetlacus.ca",
        "phone": "(294) 840-6685"
        },]
    const newContact = {
        "favorite": true,
        "name": "Tom Sawyer",
        "email": "tome@gmail.uk",
        "phone": "(002) 914-3792"
        }
    
    test('should get all contacts', async () => {
        Contacts.getAllContacts = jest.fn(() => {
        return {contacts, limit:5, page:1, total: contacts.length }
        })
        const result = await getAllContacts(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual('success')
        expect(result.code).toEqual(HttpCode.OK)
        expect(result).toHaveProperty('data')
    })

    test('repositories return Error when get all contacts', async () => {
        Contacts.getAllContacts = jest.fn(() => {
        throw new Error('Error')
        })
        await getAllContacts(req, res, next)
        expect(next).toHaveBeenCalled()
    })

    test('should get contact by Id', async () => {
        Contacts.getContactById = jest.fn((userId, contactId ) => {
            const [contact] = contacts.filter(el => String(el._id) === String(contactId))
        return contact
        })
        const { favorite, _id, name, email, phone } = contacts[0]
        req.params = { contactId: _id }
        const result = await getContactById(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual('success')
        expect(result.code).toEqual(HttpCode.OK)
        expect(result.data.contact).toHaveProperty('favorite', favorite)
        expect(result.data.contact).toHaveProperty('_id', _id)
        expect(result.data.contact).toHaveProperty('name', name)
        expect(result.data.contact).toHaveProperty('email', email)
        expect(result.data.contact).toHaveProperty('phone', phone)
    })

    test('get contact by Id not exist', async () => {
        Contacts.getContactById = jest.fn()
        const result = await getContactById(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual('error')
        expect(result.code).toEqual(HttpCode.NOT_FOUND)
        expect(result.message).toEqual(messages.NOT_FOUND)
    })

    test('repositories return Error when get contact by Id', async () => {
        Contacts.getContactById = jest.fn(() => {
        throw new Error('Error')
        })
        await getContactById(req, res, next)
        expect(next).toHaveBeenCalled()
    })

    test('should create contact', async () => {
        Contacts.addContact = jest.fn((userId, body) => {
            contacts.push({...body, _id: "60b201e07cd92b1c88er3f61"})
        return {...body, _id: "60b201e07cd92b1c88er3f61"}
        })
        req.body = newContact
        const result = await addContact(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual('success')
        expect(result.code).toEqual(HttpCode.CREATED)
        expect(result.data.contact).toHaveProperty('favorite', newContact.favorite)
        expect(result.data.contact).toHaveProperty('_id')
        expect(result.data.contact).toHaveProperty('name', newContact.name)
        expect(result.data.contact).toHaveProperty('email', newContact.email)
        expect(result.data.contact).toHaveProperty('phone', newContact.phone)
    })

    test('create contact fell', async () => {
        Contacts.addContact = jest.fn()
        const result = await addContact(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual('error')
        expect(result.code).toEqual(HttpCode.BAD_REQUEST)
        expect(result.message).toEqual(messages.BAD_REQUEST)
    })

    test('repositories return Error when create contact', async () => {
        Contacts.addContact = jest.fn(() => {
        throw new Error('Error')
        })
        await addContact(req, res, next)
        expect(next).toHaveBeenCalled()
    })

    test('should update contact', async () => {
        Contacts.updateContact = jest.fn((userId, contactId, body) => {
            const [contact] = contacts.filter(el => String(el._id) === String(contactId))
            if (contact) {contact.name = body.name}
        return contact
        })
        const { _id } = contacts[0]
        req.params = { contactId: _id }
        const name = 'Mark Twen'
        req.body = { name }
        const result = await updateContact(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual('success')
        expect(result.code).toEqual(HttpCode.OK)
        expect(result.data.contact).toHaveProperty('_id', _id)
        expect(result.data.contact).toHaveProperty('name', name)
    })

    test('update contact not have body', async () => {
        req.body = null
        const result = await updateContact(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual('error')
        expect(result.code).toEqual(HttpCode.BAD_REQUEST)
        expect(result.message).toEqual(messages.BAD_REQUEST)
    })

    test('update contact not exist', async () => {
        req.params = { contactId: 2 }
        req.body = {}
        const result = await updateContact(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual('error')
        expect(result.code).toEqual(HttpCode.NOT_FOUND)
        expect(result.message).toEqual(messages.NOT_FOUND)
    })

    test('repositories return Error when update contact', async () => {
        Contacts.updateContact = jest.fn(() => {
        throw new Error('Error')
        })
        await updateContact(req, res, next)
        expect(next).toHaveBeenCalled()
    })

    test('should remove contact by Id', async () => {
        Contacts.removeContact = jest.fn((userId, contactId) => {
            const index = contacts.findIndex(el => String(el._id) === String(contactId))
            if (index !== -1) {
                const [contact] = contacts.splice(index, 1)
                return contact
            }
        return null
        })
        const { _id, name, email, phone } = contacts[0]
        req.params = { contactId: _id }
        const result = await removeContact(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual('success')
        expect(result.code).toEqual(HttpCode.OK)
        expect(result.data.contact).toHaveProperty('_id', _id)
        expect(result.data.contact).toHaveProperty('name', name)
        expect(result.data.contact).toHaveProperty('email', email)
        expect(result.data.contact).toHaveProperty('phone', phone)
    })

    test('remove contact by wrong Id', async () => {
        Contacts.removeContact = jest.fn()
        const result = await removeContact(req, res, next)
        expect(result).toBeDefined()
        expect(result.status).toEqual('error')
        expect(result.code).toEqual(HttpCode.NOT_FOUND)
        expect(result.message).toEqual(messages.NOT_FOUND)
    })

    test('repositories return Error when remove contact', async () => {
        Contacts.removeContact = jest.fn(() => {
        throw new Error('Error')
        })
        await removeContact(req, res, next)
        expect(next).toHaveBeenCalled()
    })
})