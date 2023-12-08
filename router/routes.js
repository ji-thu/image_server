const express = require('express')

const router = new express.Router()

const usercontroller = require('../controllers/usercontroller')

router.post('/users/register',usercontroller.register)
router.post('/users/login',usercontroller.login)

module.exports = router