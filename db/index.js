const mongoose = require('mongoose')
require('dotenv').config()
let uriDB = null

if (process.env.NODE_ENV === 'test') {
    uriDB = process.env.URI_DB_TEST
} else {
    uriDB = process.env.URI_DB
    }

const db = mongoose.connect(uriDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 5
})

if (process.env.NODE_ENV !== 'test') {
    mongoose.connection.on('connected', () => {
        console.log(`Connection open ${uriDB}`)
    })
}

mongoose.connection.on('error', (err) => {
    console.log(`Error connection ${err.message}`);
})

mongoose.connection.on('disconnected', () => {
    console.log(`Database disconnected`);
})

process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
        console.log('Connection to DB disconnected')
        process.exit(1)
    })
})

module.exports = db