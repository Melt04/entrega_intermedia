const Cart = require('../Repository/Cart/index')
const sendMail = require('../../nodemailer/index')
const client = require('../../twilio/index')
const { formatProductsToHtml } = require('../../helpers/index')
const logger = require('../../logger')

createNewCart = async (_, res, next) => {
  try {
    const datos = await Cart.createNewCart({
      userId: req.user.id,
      products: JSON.stringify([])
    })
    return res.json({ message: 'Creado con exito' })
  } catch (e) {
    next(new Error(e.message))
  }
}
getAllCarts = async (req, res, next) => {
  try {
    const datos = await Cart.getAllCarts()
    res.json(datos)
  } catch (e) {
    next(new Error(e.message))
  }
}
deleteCartById = async (req, res, next) => {
  const data = { userId: req.user.id }
  try {
    const cartProducts = await Cart.getContentOfCart(data)
    await Cart.deleteCartById(data)
    await Cart.createNewCart({
      userId: req.user.id,
      products: JSON.stringify([])
    })
    const mailOptions = {
      from: 'node',
      subject: `Nuevo Pedido de ${req.user.username}`,
      html: formatProductsToHtml(cartProducts)
    }
    client.messages
      .create({
        body: formatProductsToHtml(cartProducts),
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5492235917701'
      })

      .done()

    try {
      const message = await client.messages.create({
        body: 'Su pedido se recibio y se encuentra en proceso',
        from: '+16018736631',
        to: `+${req.user.telnumber}`
      })
    } catch (e) {
      logger.error(e.message)
    }

    const mail = await sendMail(mailOptions)

    return res.send({ message: 'Compra Finalizada' })
  } catch (e) {
    next(new Error(e.message))
  }
}

addProductToCart = async (req, res, next) => {
  const cartOwner = req.user.email
  const { idProd } = req.body
  try {
    await Cart.addProductToCart(cartOwner, idProd)
    res.json({ message: 'Producto agregado' })
  } catch (e) {
    next(new Error(e.message))
  }
}
getProductsFromCart = async (req, res, next) => {
  const { email } = req.user

  const content = await Cart.getContentOfCart(email)
  if (content) {
    return res.send(content)
  }
  const error = new Error('No se pudo recuperar el contenido del carrito')
  next(error)
}
deleteProductsFromCart = async (req, res, next) => {
  try {
    const cartOwner = req.user.email
    const { idProd } = req.params
    await Cart.deleteProductFromCart(cartOwner, idProd)
    return res.send({ message: 'Producto borrado' })
  } catch (e) {
    const error = new Error('No se pudo borrar el producto del carrito')
    next(error)
  }
}

module.exports = {
  createNewCart,
  deleteCartById,
  getProductsFromCart,
  addProductToCart,
  deleteProductsFromCart,
  getAllCarts
}
