const passport = require('passport')

const Cart = require('../src/Repository/Cart/index')
const LocalStrategy = require('passport-local').Strategy
const User = require('../src/Repository/User')
const {
  createHash,
  isValidPassword,
  formattoHtml
} = require('../helpers/index')
const fs = require('fs')
const sendMail = require('../nodemailer')
const logger = require('../logger/index')

const signUpStrategy = new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, done) => {
    const { age, name, address, telnumber, avatar } = req.body

    User.findOne({ username: username }, function (err, user) {
      if (err) {
        logger.log('error', `Error in SignUp ${err}`)
        return done(err)
      }

      if (user) {
        logger.log('warn', `User ${user.username} alredy exist`)
        return done(null, false)
      }

      const newUser = {
        username: username,
        password: createHash(password),
        name,
        age,
        address,
        telnumber
      }

      User.create(newUser, async (err, userWithId) => {
        if (err) {
          logger.log('error', `Error saving user ${err}`)
          return done(err)
        }

        Cart.createNewCart({
          userId: userWithId.id,
          products: JSON.stringify([])
        })

        const mailOptions = {
          from: 'node',
          subject: 'Nuevo Registro',
          html: formattoHtml(newUser)
        }

        const mail = await sendMail(mailOptions)
        fs.mkdir(`public/uploads/${username}`, err => {
          if (err) {
            logger.log('error', `Error saving avatar ${err}`)

            return
          }
          fs.writeFile(
            `public/uploads/${username}/avatar.png`,
            req.file.buffer,
            function (err) {
              if (err) {
                logger.log('error', `Error saving avatar ${err}`)
                return
              }
              logger.log('info', `Mail sended`)
            }
          )
        })

        return done(null, userWithId)
      })
    })
  }
)

const loginStrategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      logger.error(err.message)
      return done(err)
    }

    if (!user) {
      return done(null, false)
    }

    if (!isValidPassword(user, password)) {
      return done(null, false)
    }

    return done(null, user)
  })
})
module.exports = { loginStrategy, signUpStrategy }
