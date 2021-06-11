const app = require('../app')
const db = require('../db')
const createFolderIsNotExist = require('../helpers/createFolder')
require('dotenv').config()
const path = require('path')


const PORT = process.env.PORT || 3000
const UPLOAD_DIR = process.env.UPLOAD_DIR
const USERS_AVATARS = process.env.USERS_AVATARS
const PUBLIC_FOLDER = process.env.PUBLIC_FOLDER
const createdFolder = path.join(__dirname, '../', PUBLIC_FOLDER, USERS_AVATARS)

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR)
    await createFolderIsNotExist(createdFolder)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch(err => {
  console.log(`Server not running. Error: ${err.message}`)
})
