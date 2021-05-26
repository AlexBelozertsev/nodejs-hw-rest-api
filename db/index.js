const { MongoClient } = require('mongodb')
require('dotenv').config()
const uriDB = process.env.URI_DB

const db = new MongoClient.connect(uriDB, { useNewUrlParser: true, poolSize: 5 })

process.on('SIGINT', async () => {
    const client = await db
    client.close()
    console.log('Connection for DB disconnected')
    process.exit()
})

module.exports = db