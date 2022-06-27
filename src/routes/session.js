const express = require('express')
const router = express.Router()
router.post('/', (req, res) => {
  return res.redirect('/products')
})
router.post('/logout', (req, res) => {
  const { name } = req.session

  req.session.destroy(err => {
    if (err) {
      throw new Error(err)
    }
    console.log('SESSION', req.session)
    console.log('destroy')
    return res.render('logout', { user: name })
  })
})
module.exports = { router }
