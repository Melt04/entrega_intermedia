const ProductDTO = require('../DTOs/Product')
const Product = require('../Repository/Products/index')

getAllProducts = async (req, res, next) => {
  try {
    const datos = await Product.getAllProducts()
    return res.json(datos)
  } catch (e) {
    next(new Error(e.message))
  }
}
getProductById = async (req, res, next) => {
  const { id } = req.params
  try {
    const product = await Product.getProductById(id)

    if (product) {
      const productDto = new ProductDTO(product)
      return res.json(productDto)
    }
    return res.json({ message: 'No se encontro el producto' })
  } catch (e) {
    next(new Error(e.message))
  }
}
createProduct = async (req, res, next) => {
  const { product } = req.body
  try {
    await Product.createProduct({ product })
    return res.json({ message: 'ok' })
  } catch (e) {
    next(new Error(e.message))
  }
}
deleteProductById = async (req, res, next) => {
  const { id } = req.params
  try {
    await Product.deleteProductById(id)
    return res.send({ message: 'Borrado con exito' })
  } catch (e) {
    next(new Error(e.message))
  }
}
updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { newProduct } = req.body

    const updatedProduct = await Product.updateProductById({ id, newProduct })

    return res.send(updatedProduct)
  } catch (e) {
    next(new Error(e.message))
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById
}
