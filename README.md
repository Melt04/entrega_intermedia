# Desafio CoderHouse 05

Construccion de una api rest para productos

# Correr el proyecto

- npm install
- npm start

# Endpoint

/api/productos:

- GET /id : Lista todos los productos disponibles
- POST / : Crea un producto
- PUT /id : Actualiza un producto por id
- DELETE /id : Borra un producto por id

/api/cart:

- POST / : Crea un carrito
- DELETE /id : Borra un carrito por id
- GET /id/products : Devuelve los productos del carrito por id
- POST /id/products/idProd : Guarda el producto con idProd en el carrito con id
- DELETE /id/products/idProd : Borra el producto con idprod del carrito con id.

# Consideraciones

Para crear un nuevo producto, se debe enviar un objeto product en el body.Ej :
<br/>
{
"product": {<br/>
"nombre": "Lapiz",<br/>
"stock": 1,<br/>
"desc": "Para escribir",<br/>
"codigo": 001,<br/>
"foto": "http://",<br/>
"precio": "21"<br/>
}<br/>
}<br/>

Para actualizar un producto ,se debe enviar un objeto newProduct en el body.Ej :
<br/>
{<br/>
"newProduct": {<br/>
"nombre":"Lapiz 02",<br/>
"precio": "23"<br/>
    }
}
