require('./db/mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const {routerPuja} = require('./routes/routerPuja')
const {routerProducto} = require('./routes/routerProducto')
const {routerUsuario} = require('./routes/usuarioRoute')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})

app.use('/puja', routerPuja)
app.use('/producto', routerProducto)
app.use('/usuario', routerUsuario)

const port = 5001
app.listen(port, () => {
    console.log('Listening on port ' + port)
})