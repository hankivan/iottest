const express = require('express')
const UserController = require('../controller/user.js')
const FormController = require('../controller/form.js')
const router = express.Router()

UserController(router)
FormController(router)

module.exports = router
