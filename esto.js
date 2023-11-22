const express = require('express')
const {PManager} = require ("./ProductManager")
const app = express()
const port = 8080


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productos = new PManager ("./pruebas.json")

app.get('/productos',   async (req, res) => {
    let devolver = req.query;
      const productosADevolver= await productos.getProducts();    
    res.send({productos});
  });
    

  app.listen(port, () => {
    console.log(productos)
  })