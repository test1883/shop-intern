const express = require('express')

// controller functions
const { loginUser, signupUser,userCart } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//cart route
router.post('/cart', userCart)

module.exports = router