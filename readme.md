# Contact server

## GoIT Node.js Homework

### Overview

This app is a tutorial project for creating and working with users and their contacts database. During the training process, the file structure and additional functionality can change significantly, so keep an eye on the relevance of the application version. The application is a server working with the MongoDB database.

---

### Usage:

1. Start

- `npm start` - server start in production mode
- `npm run start:dev` - server start in development mode

2. Recommended for use with:

- Postman
- have an account on Cloudinary.com

3. Using

- To start working with his collection of contacts, the user needs to register.
  To do this, you need to go to the next router
  `POST`: `http://localhost:3000/api/users/signup`
  And create your account by filling in the required fields `e-mail` and `password`(min 6 symbols) in the body.
  You can also specify `name` and `subscription` option for example:

  `{ "name": "NewUser", "email": "newUser@gmail.com", "password": "123456789", "subscription": "starter" }`

  If the request is entered correctly, the response may look like this:

  ```

  {
    "status": "success",
    "code": 201,
    "data": {
        "id": "60bbe66df2443c3c5ca47dfe",
        "email": "newUser@gmail.com",
        "subscription": "starter"
    }
  }

  ```

- The user can change his avatar by adding an image (no more than 2 MB) along the following route:
  `PATCH`: `http://localhost:3000/api/users/avatars`
  As shown in the illustration, in the request body, select the "form factor" radio button and specify the
  `key = avatar` and `value = your photo`
  ![alt text](http://joxi.ru/a2XBWJ7ily7wpr)
  Attention: the size of the avatar will be transformed into a square with a side of 250p
  If the request is entered correctly, the response may look like this:

  ```

  {
    "status": "success",
    "code": 200,
    "data": {
        "avatarUrl": "https://res.cloudinary.com/{yourAccount}/image/upload/v1627903/CloudAvatar/jucqmun7jfjvq8ro.jpg"
    }
  }

  ```

  If you do not want to use cloud storage for your avatar, but use the resources of the local server, you need to follow the path `controllers/user.js`
  and uncomment part of the code of the following under the heading `// Local upload method`,
  and comment out the part of the code of the following under the heading `// Cloud upload method`.

- To go through the login procedure, you need to go to the following route
  `POST`: `http://localhost:3000/api/users/login`
  and specify the required fields `e-mail` and your `password` in the request body for example:
  `{ "email": "newUser@gmail.com", "password": "123456789" }`
  If the request is entered correctly, the response may look like this:

```

{
"status": "success",
"code": 200,
"data": {
"token": "eyJhbGciOiJIUzI1NiIR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmI2MjVkZmY4YzJhMTM0NDVhMDBkMSII6MTYyMjg5NTEzNiwiZXhwIjoxNjIyOTgxNTM2fQ.MPTW0xE8_jBjoCD7WBuvnb2qLaNl5Ra1X-WyIVtIo",
"email": "newUser@gmail.com",
"subscription": "starter"
}
}

```

Pay attention to the token in the response. On subsequent requests to the server, the token will be required to work with custom settings.

- To view the data of the current user, you need to go to the following route (a token is required):
  `GET`: `http://localhost:3000/api/users/current`
  If the request is entered correctly, the response may look like this:

```

{
"status": "success",
"code": 200,
"data": {
"email": "example@test.com",
"subscription": "pro"
}
}

```

- To change the subscription status of the current user, you need to go to the following route (a token is required):
  `PATCH`:`http://localhost:3000/api/users`
  and change the subscription status by specifying one of the options in the body:
  `['starter', 'pro', 'business']`. The request body might look like this:
  `{ "subscription": "pro" }`
  If the request is entered correctly, the response may look like this:

```

{
"status": "success",
"code": 200,
"data": {
"name": "Example",
"email": "example@test.com",
"subscription": "pro"
}
}

```

- To logout, you need to go to the following route (a token is required):
  `POST`: `http://localhost:3000/api/users/logout`
  If the request is entered correctly, you can see:
  `204 No Content`

- The user can create a contact by sending a request to the router
  `POST`: `http://localhost:3000/api/contacts`
  in the request it is necessary to send the body of the added contact for example:
  `{ "name": "Contact Name", "email": "contact@gmail.com", "phone": "+38(0--)123-45-67" }`
  If the request is entered correctly, the response may look like this:

```

{
"status": "success",
"code": 201,
"data": {
"contact": {
"favorite": false,
"\_id": "60b53e05c393bc264034a40c",
"name": "Contact Name",
"email": "contact@gmail.com",
"phone": "+38(0--)123-45-67",
"createdAt": "2021-05-31T19:50:29.347Z",
"updatedAt": "2021-05-31T19:50:29.347Z"
}
}
}

```

- The user can get a list of all his contacts by sending a request to the router
  `GET`: `http://localhost:3000/api/contacts`
  If the request is entered correctly, the response may look like this:

```

{
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
...
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

- Knowing the contact ID, the user can find it by sending a request to the router
  `GET`: `http://localhost:3000/api/contacts/<contact ID>`
  If the request is entered correctly, the response may look like this:

```

{
"status": "success",
"code": 200,
"data": {
"contact": {
"favorite": false,
"\_id": "60b201e07cd92b1c88fa3f61",
"name": "Allen Raymond",
"email": "nulla.ante@vestibul.co.uk",
"phone": "(992) 914-3792"
}
}
}

```

- Knowing the contact ID, the user can change the contact by sending a request to the router
  `PUT`: `http://localhost:3000/api/contacts/<contact ID>`
  in the request, you must send the body of the contact to be changed for example:
  `{ "name": "NewContact Name" }` or `{ "phone": "+38(0--)123-45-67" }` ets.
  If the request is entered correctly, the response may look like this:

```

{
"status": "success",
"code": 200,
"data": {
"contact": {
"favorite": false,
"\_id": "60b53e05c393bc264034a40c",
"name": "NewContact",
"email": "postman@mail.com",
"phone": "050-050-05-05",
"createdAt": "2021-05-31T19:50:29.347Z",
"updatedAt": "2021-05-31T19:59:12.266Z"
}
}
}

```

- Knowing the contact ID, the user can change the status of the contact by sending a request to the router
  `PATCH`: `http://localhost:3000/api/contacts/<contact ID>/favorite`
  in the request, you must send the body of the contact to be changed for example:
  `{ "favorite": true }`
  If the request is entered correctly, the response may look like this:

```

{
"status": "success",
"code": 200,
"data": {
"contact": {
"favorite": true,
"\_id": "60b53e05c393bc264034a40c",
"name": "NewContact",
"email": "postman@mail.com",
"phone": "050-050-05-05",
"createdAt": "2021-05-31T19:50:29.347Z",
"updatedAt": "2021-05-31T20:01:41.450Z"
}
}
}

```

- Knowing the contact ID, the user can delete the contact by sending a request to the router
  `DELETE`: `http://localhost:3000/api/contacts/<contact ID>`
  If the request is entered correctly, the response may look like this:

```

{
"status": "success",
"code": 200,
"message": "contact deleted",
"data": {
"contact": {
"favorite": true,
"\_id": "60b53e05c393bc264034a40c",
"name": "NewContact",
"email": "postman@mail.com",
"phone": "050-050-05-05",
"createdAt": "2021-05-31T19:50:29.347Z",
"updatedAt": "2021-05-31T20:01:41.450Z"
}
}
}

```
