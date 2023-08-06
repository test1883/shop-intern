const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const requireAuth = require("../middleware/requireAuth")

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    const {userName, cart} = user
    res.status(200).json({userName, email, cart, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
    const {userName, email, password} = req.body
    console.log("hehehehe")
    try {
        console.log("hereeee")
        const user = await User.signup(userName, email, password)
        console.log("heree")
        // create a token
        const token = createToken(user._id)
        const cart = []
        console.log('heree')
        console.log(token)
        return res.status(200).json({userName, email, cart, token})
    } catch (error) {
        return res.status(400).json({error: error.message})
  }
}

const userCart = async (req, res) => {
    await requireAuth(req,res,()=>(null))
    const { cart } = req.body
    console.log(cart)
    const user = await User.findOneAndUpdate({_id: req.user.id}, {
      cart: req.body.cart
    })
    console.log(user)
    res.status(200).json(user)
}

module.exports = {
    loginUser,
    signupUser,
    userCart
}