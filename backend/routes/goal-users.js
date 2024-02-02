const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  logout,
} = require('../controllers.js/goal-users')
// const { protect } = require('../middleware/authMiddleware')

const {protect} = require('../middlewares/goal-authmiddlewar')

router.post('/add', registerUser)
router.post('/login', loginUser)
router.get('/me',protect,getMe)
router.get('/logout',protect,logout)

module.exports = router