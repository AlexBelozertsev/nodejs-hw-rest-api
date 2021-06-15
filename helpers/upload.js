const multer = require('multer')
const { HttpCode, limits, messages} = require('./constants')
require('dotenv').config()
const UPLOAD_DIR = process.env.UPLOAD_DIR

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`)
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: limits.LIMIT_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    const error = new Error(messages.WRONG_FORMAT)
    error.status = HttpCode.BAD_REQUEST
    cb(error)
  },
})

module.exports = upload