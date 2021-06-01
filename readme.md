# Contact server

## GoIT Node.js Homework

---

### Overview

This app is a tutorial project for creating and working with a user contacts database. During the training process, the file structure and additional functionality can change significantly, so keep an eye on the relevance of the application version. Application works with MongoDB database.

---

### Usage:

1. Start

- `npm start` - server start in production mode
- `npm run start:dev` - server start in development mode

2. Recommended for use with:

- Postman

3. Using

- The user can create a contact by sending a request to the router `POST`:
  `http://localhost:3000/api/contacts`
  in the request it is necessary to send the body of the added contact for example:

  `{ "name": "Contact Name", "email": "contact@gmail.com", "phone": "+38(0--)123-45-67" }`

  If the request is entered correctly, the response may look like this:

  ```{
    "status": "success",
    "code": 201,
    "data": {
        "contact": {
            "favorite": false,
            "_id": "60b53e05c393bc264034a40c",
            "name": "Contact Name",
            "email": "contact@gmail.com",
            "phone": "+38(0--)123-45-67",
            "createdAt": "2021-05-31T19:50:29.347Z",
            "updatedAt": "2021-05-31T19:50:29.347Z"
        }
    }
  }
  ```

- The user can get a list of all his contacts by sending a request to the router `GET`:
  `http://localhost:3000/api/contacts`
  If the request is entered correctly, the response may look like this:

  ```{
    "status": "success",
    "code": 200,
    "data": {
        "contacts": [
            {
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
            },
            ...
        ]
    }
  }
  ```

- Knowing the contact ID, the user can find it by sending a request to the router `GET`:
  `http://localhost:3000/api/contacts/<contact ID>`
  If the request is entered correctly, the response may look like this:

  ```{
    "status": "success",
    "code": 200,
    "data": {
        "contact": {
            "favorite": false,
            "_id": "60b201e07cd92b1c88fa3f61",
            "name": "Allen Raymond",
            "email": "nulla.ante@vestibul.co.uk",
            "phone": "(992) 914-3792"
            }
        }
    }
  ```

- Knowing the contact ID, the user can change the contact by sending a request to the router `PUT`:
  `http://localhost:3000/api/contacts/<contact ID>`
  in the request, you must send the body of the contact to be changed for example:
  `{ "name": "NewContact Name" }`
  or `{ "phone": "+38(0--)123-45-67" }` ets.
  If the request is entered correctly, the response may look like this:

  ```{
    "status": "success",
    "code": 200,
    "data": {
        "contact": {
            "favorite": false,
            "_id": "60b53e05c393bc264034a40c",
            "name": "NewContact",
            "email": "postman@mail.com",
            "phone": "050-050-05-05",
            "createdAt": "2021-05-31T19:50:29.347Z",
            "updatedAt": "2021-05-31T19:59:12.266Z"
            }
        }
    }
  ```

- Knowing the contact ID, the user can change the status of the contact by sending a request to the router `PATCH`:
  `http://localhost:3000/api/contacts/<contact ID>/favorite`
  in the request, you must send the body of the contact to be changed for example:
  `{ "favorite": true }`
  If the request is entered correctly, the response may look like this:

  ```{
    "status": "success",
    "code": 200,
    "data": {
        "contact": {
            "favorite": true,
            "_id": "60b53e05c393bc264034a40c",
            "name": "NewContact",
            "email": "postman@mail.com",
            "phone": "050-050-05-05",
            "createdAt": "2021-05-31T19:50:29.347Z",
            "updatedAt": "2021-05-31T20:01:41.450Z"
            }
        }
    }
  ```

- Knowing the contact ID, the user can delete the contact by sending a request to the router `DELETE`:
  `http://localhost:3000/api/contacts/<contact ID>`
  If the request is entered correctly, the response may look like this:

  ```{
    "status": "success",
    "code": 200,
    "message": "contact deleted",
    "data": {
        "contact": {
            "favorite": true,
            "_id": "60b53e05c393bc264034a40c",
            "name": "NewContact",
            "email": "postman@mail.com",
            "phone": "050-050-05-05",
            "createdAt": "2021-05-31T19:50:29.347Z",
            "updatedAt": "2021-05-31T20:01:41.450Z"
        }
    }
  }
  ```
