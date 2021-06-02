const express = require('express')
const router = express.Router()
const control = require('../../controllers/users')

router.post('/register', control.register)
router.post('/login', control.login)
// router.post('/logout', control.logout)

module.exports = router
