const axios = require('axios')
const { getAllProducts } = require('../Repository/Products/index')

//Lectura de productos

const testAllProducts = async () => {
  try {
    console.log('*********Pruebas Manuales**********')
    const allProducts = await axios.get('http://localhost:8080/api/products')
    console.log(allProducts.data)
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
    console.log(addProduct.data)
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
    console.log(updatedProduct.data)
    const deletedProduct = await axios.delete(
      `http://localhost:8080/api/products/3`
    )
    console.log(deletedProduct.data)
    console.log('*********Pruebas Manuales**********')
  } catch (error) {
    console.log(error)
  }
}

module.exports = testAllProducts
