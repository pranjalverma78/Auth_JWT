const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/goalusers-models')

//asynHandler -- Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
      //   token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body
  console.log(req.body)

  // Check for user email
  const user = await User.findOne({ name })

  if (user && (await bcrypt.compare(password, user.password))) {
    let token = generateToken(user._id)
    // res.cookie('access_token', token, { httpOnly: true, sameSite: true })
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

const logout = asyncHandler(async (req, res) => {
  // res.status(200).json(req.user)
  try {
    res.clearCookie('jwt');
    //this will deleted the cookie saved in the page
    res.json({ msg: 'logout successfully,cookie deleted' })
  } catch (error) {
    res.status(500).send(error)
  }
})
//when we save the token on server then the user or device whose token is saved remains login
//if we want to delete particular device then delete its token from server
//req.user.token = req.user.tokens.filter((e)=>{
//   return e.token !== req.token
// })//req.user is the User


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logout
}