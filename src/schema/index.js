const { buildSchema } = require(`graphql`)
const schema = buildSchema(`
  type Product{

  name:String
  desc: String
  code: Int,
  urlPhoto: String,
  price: Int,
  stock: Int,
  date: String,
}
input ProductInput{
  
   name:String
  desc: String
  code: Int,
  urlPhoto: String,
  price: Int,
  stock: Int,
  date: String,
}
input NewProductInput{
   name:String!
  desc: String!
  code: Int!,
  urlPhoto: String!,
  price: Int!,
  stock: Int!,
  

}
type Query{
    getAllProducts:[Product]
    getProductById(id:String):Product
    
}
type Mutation{
  deleteProductById(id:String):Product
  updateProductById(id:String,newProduct:ProductInput):Product
  createProduct(product:NewProductInput):Product
}
`)

module.exports = {
  schema
}
