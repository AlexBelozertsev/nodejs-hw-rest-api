const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const boolParser = require('express-query-boolean')
const path = require('path')
require('dotenv').config()
const PUBLIC_FOLDER = process.env.PUBLIC_FOLDER
const { HttpCode, limits } = require('./helpers/constants')
const {limiterAPI} = require('./helpers/rateLimit')
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(express.static(path.join(__dirname, PUBLIC_FOLDER)))
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: limits.LIMIT_JSON }))
app.use(boolParser())

app.use('/api/', rateLimit(limiterAPI))
app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res, next) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/contacts`,
    data: 'Not found'
  })
})

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
  res
    .status(err.status)
    .json({
    status: err.status === HttpCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === HttpCode.INTERNAL_SERVER_ERROR ? 'Internal Server Error' : err.data
  })
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

module.exports = app
