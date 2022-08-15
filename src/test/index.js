const axios = require('axios')
const logger = require('../../logger/index')
const { getAllProducts } = require('../Repository/Products/index')

//Lectura de productos

const testAllProducts = async () => {
  try {
    const allProducts = await axios.get('http://localhost:8080/api/products')
    logger.info(allProducts.data)
    const product = {
      name: 'Mochila',
      desc: 'Mochila',
      code: 3,
      urlPhoto: 'http',
      price: 9,
      stock: 100
    }
    const addProduct = await axios.post('http://localhost:8080/api/products', {
      product: product
    })

    const updateProduct = {
      name: 'Mochila',
      desc: 'Mochila',
      code: 3,
      urlPhoto: 'http',
      price: 9,
      stock: 1
    }
    const updatedProduct = await axios.put(
      'http://localhost:8080/api/products/3',
      {
        newProduct: updateProduct
      }
    )
    logger.log(JSON.stringify(updatedProduct.data, null, 2))
    const deletedProduct = await axios.delete(
      `http://localhost:8080/api/products/3`
    )
    logger.info(deletedProduct.data)
    logger.info('*********Pruebas Manuales**********')
  } catch (error) {
    logger.info(error)
  }
}

module.exports = testAllProducts
