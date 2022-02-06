const { products } = require("../../controllers/products");
const { getMaxId } = require("../../helpers/index");
class Cart {
  constructor() {
    this.carts = [];
  }
  createNewCart() {
    const id = getMaxId(this.carts);
    const products = [];
    this.carts.push({ id, products });
    return id;
  }
  deleteCart(id) {
    const index = this.carts.findIndex((cart) => id == cart.id);
    if (index > -1) {
      this.carts.splice(index, 1);
      return true;
    }
    return false;
  }
  getContentOfCart(id) {
    const index = this.carts.findIndex((cart) => id == cart.id);
    if (index > -1) {
      return this.carts[index].products;
    }
    return false;
  }
  addProductToCart(id, idProduct) {
    const index = this.carts.findIndex((cart) => id == cart.id);
    if (index > -1) {
      const productIndex = this.carts[index].products.findIndex((product) => {
        return product.id == idProduct;
      });
      if (productIndex > -1) {
        this.carts[index].products[productIndex].quantity++;
        return true;
      }
      this.carts[index].products.push({ id: idProduct, quantity: 1 });
      return true;
    }
    return false;
  }
  deleteProductFromCart(id, idProduct) {
    const index = this.carts.findIndex((cart) => id == cart.id);
    if (index > -1) {
      const productIndex = this.carts[index].products.findIndex((product) => product.id == idProduct);
      if (productIndex > -1) {
        this.carts[index].products.splice(productIndex, 1);
        return true;
      }
    }
    return false;
  }
}
module.exports = new Cart();
