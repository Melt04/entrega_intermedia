class ProductDTO {
  constructor (datos) {
    this.name = datos.name
    this.desc = datos.desc

    this.urlPhoto = datos.urlPhoto
    this.price = datos.price
    this.stock = datos.stock
  }
}

module.exports = ProductDTO
