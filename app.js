const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const { configServer } = require('./config/initServer').exp
configServer()
const { router: routerCart } = require('./src/routes/cart')
const { router: routerProduct } = require('./src/routes/products')
const { router: routerLogin } = require('./src/routes/login')
const { router: routerSession } = require('./src/routes/session')
const passport = require('passport')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const logger = require('./logger/index')
const yarg = require('yargs/yargs')(process.argv.slice(2))

const cluster = require('cluster')
const MODE = yarg.argv.MODE
console.log(MODE)

const User = require('./src/Repository/User/index')

const PORT = process.env.PORT || 8080

// PASSPORT
const { loginStrategy, signUpStrategy } = require('./authStrategy/index')
passport.use('signup', signUpStrategy)
passport.use('login', loginStrategy)

passport.serializeUser((user, done) => {
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vrmey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      mongoOptions: mongoOptions
    }),
    secret: 'my secret',
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 10
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

//

// Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
const client = require('./twilio/index')

//twilio

//
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
console.log(path.join(__dirname, 'public'))
app.use('/', routerLogin)
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)
app.use('/api/session', routerSession)

app.use('*', (req, res) => {
  const { method, path } = req
  res.send({
    error: -1,
    description: `Ruta ${path} metodo ${method} no implementado`
  })
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message
  res.status(status).send({ message })
})
app.listen(PORT, async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vrmey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )
    console.log(`Escuchando en puerto ${PORT}`)
  } catch (e) {
    console.log(e)
  }
})
