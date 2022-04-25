
const Cart = require('../models/Cart/index')

createNewCart = async (_, res, next) => {
  try {
    const datos = await Cart.createNewCart({ products: JSON.stringify([]) })
    console.log(datos)
    return res.json({ message: 'Creado con exito' });
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
  const { id } = req.params
  try {
    await Cart.deleteCartById(id)
    return res.send({ message: 'Borrado con exito' })
  } catch (e) {
    next(new Error(e.message))
  }

}

addProductToCart = async (req, res, next) => {
  const { id } = req.params
  const { idProd } = req.body
  try {
    await Cart.addProductToCart(id, idProd)
    res.json({ message: 'Producto agregado' })
  } catch (e) {
    next(new Error(e.message))
  }


}
getProductsFromCart = async (req, res, next) => {
  const { id } = req.params
  const content = await Cart.getContentOfCart(id)
  if (content) {
    return res.send(content)
  }
  const error = new Error('No se pudo recuperar el contenido del carrito')
  next(error)
}
deleteProductsFromCart = async (req, res, next) => {

  try {
    const { id } = req.params
    const { idProd } = req.params
    await Cart.deleteProductFromCart(id, idProd)
    return res.send({ message: 'ok' })

  } catch (e) {
    console.log(e)
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
