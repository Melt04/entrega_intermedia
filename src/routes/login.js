const express = require('express')
const router = express.Router()
const passport = require('passport')
const multer = require('multer')
const upload = multer({})

router.get('/faillogin', (req, res) => {
  res.render('error.hbs', { error: 'LOGIN' })
})
router.get('/failregister', (req, res) => {
  res.render('error.hbs', { error: 'REGISTER' })
})
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.render('public', { user: req.user.username })
  }
  return res.redirect('login')
})
router.get('/register', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('public', { user: req.user.username })
  }

  return res.render('register')
})
router.post(
  '/register',
  upload.single('avatar'),
  passport.authenticate('signup', {
    failureRedirect: '/failregister',
    successRedirect: '/login'
  }),

  (req, res) => {
    return res.render('register')
  }
)

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('public', { user: req.user })
  }
  return res.render('login')
})
router.post(
  '/products',
  passport.authenticate('login', {
    failureRedirect: '/faillogin'
  }),
  (req, res) => {
    res.render('public', { user: req.user })
  }
)
router.get('/products', (req, res, next) => {
  return res.render('public', { user: req.user })
})

module.exports = { router }
