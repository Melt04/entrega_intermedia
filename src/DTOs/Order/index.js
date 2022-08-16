class OrderSaveDto {
  constructor (datos) {
    this.customer = datos.email
    this.products = datos.products
  }
}
class OrderDto {
  constructor (datos) {
    this.customer = datos.email
    this.products = datos.products
    this.date = datos.date
  }
}
module.exports = { OrderSaveDto, OrderDto }
