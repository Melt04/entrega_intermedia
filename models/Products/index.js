const { getMaxId } = require("../../helpers/index");
class Products {
  constructor() {
    this.products = [];
  }
  getAllProducts() {
    console.log(this.products);
    return this.products;
  }
  getProductById(id) {
    return this.products.find((product) => {
      return product.id == id;
    });
  }
  addNewProduct(product) {
    this.products.push(product);
    return true;
  }
  updateProductById(id, newProduct) {
    const index = this.products.findIndex((product) => id == product.id);
    if (index > -1) {
      const currentProduct = this.products[index];
      this.products[index] = { ...currentProduct, ...newProduct };
      return true;
    }
    return false;
  }
  deleteProductById(id) {
    const index = this.products.findIndex((product) => id == product.id);
    if (index > -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
  getId() {
    return getMaxId(this.products);
  }
}

module.exports = new Products();
