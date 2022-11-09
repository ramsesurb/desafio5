const express = require('express');
const handlebars = require('express-handlebars')
const Contenedor = require('./Contenedor')
const productos = new Contenedor('./api/productos.json')
const app = express();
const PORT = 8080
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (express.static( "./public"))
app.set("views", "./views")
app.set("view engine", "hbs")

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: + 'views/layouts',
    partialsDir:  + '/views'
}))

app.get('/', (req, res) => {
    res.render('form');
})

app.get('/productos',async  (req, res) => {
    const prods = await productos.getAll()
      
    res.render('prodDisplay' ,{productos:prods });
    
    });

    app.post("/productos",async (req,res)=> {
        const prod= req.body;
        try
        {const saveProd = await productos.save(prod);  
        res.render('form')
        
        }  
        catch (err) {
         console.log(err);
        }
      });

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))