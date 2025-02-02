const express = require('express')
const router = express.Router()
const control = require('../../controllers/users')
const guard = require('../../helpers/guard')
const upload = require('../../helpers/upload')
const {createAccountLimiter} = require('../../helpers/rateLimit')
const {
  validationRegistrationUser,
  validationUserLogin,
  validationUserSubscription
} = require('../../validation/user')

router.post('/signup', createAccountLimiter, validationRegistrationUser, control.register)
router.post('/verify', control.repeatEmailVerification)
router.post('/login', validationUserLogin, control.login)
router.post('/logout', guard, control.logout)
router.get('/verify/:verificationToken', control.verify)
router.get('/current', guard, control.current)
router.patch('/', guard, validationUserSubscription, control.update)
router.patch('/avatars', guard, upload.single('avatar'), control.avatars)

module.exports = router
