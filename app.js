

const express = require('express')
const app = express()
const { configServer } = require('./config/initServer').exp
configServer()
const { router: routerCart } = require('./src/routes/cart')
const { router: routerProduct } = require('./src/routes/products')
const { fakeUserMiddleware } = require('./src/middleware/index')

const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(fakeUserMiddleware)
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)
app.use('*', (req, res) => {
  const { method, path } = req
  res.send({ error: -1, description: `Ruta ${path} metodo ${method} no implementado` })
})


app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message
  res.status(status).send({ message })
})
app.listen(PORT, async () => {
  console.log(`Escuchando en puerto ${PORT}`)
})
