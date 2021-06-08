const express = require('express')
const router = express.Router()
const control = require('../../controllers/users')
const guard = require('../../helpers/guard')
const {
  validationRegistrationUser,
  validationUserLogin,
  validationUserSubscription
} = require('../../validation/user')

router.post('/signup', validationRegistrationUser, control.register)
router.post('/login', validationUserLogin, control.login)
router.post('/logout', guard, control.logout)
router.get('/current', guard, control.current)
router.patch('/', guard, validationUserSubscription, control.update)

module.exports = router
