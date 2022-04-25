class Product {
  constructor({ id, name, desc, codigo, urlPhoto, price, stock }) {
    this.id = id
    this.name = name
    this.date = new Date().toISOString()
    this.desc = desc
    this.code = code
    this.urlPhoto = urlPhoto
    this.price = price
    this.stock = stock
  }
}



module.exports = Product
