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
- POST /id/products/ : Guarda el producto con el carrito con id
- DELETE /id/products/idProd : Borra el producto con idprod del carrito con id.

# Configuraciones

El proyecto tiene un arhivico config.json en el directorio raiz el cual se utiliza para lo siguiente:

- Setear el puerto
- Setear la persistencia
- Setear la url de mongo
- Setear el ambiente: prod o dev

La persistencia tiene 3 valores

- mongo para utilizar una bd no relacion
- sqlite para utilizar una bd relacion
- "" vacio para utilizar un archivo

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
