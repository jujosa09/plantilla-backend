require('./db/mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const {routerProducto} = require('./routes/routerProducto')
const {routerUsuario} = require('./routes/usuarioRoute')
const {routerCarbono} = require('./routes/routerCarbono')
const allowedOrigins = [
    'https://plantilla-backend.vercel.app',
    'http://localhost:5173'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Origen no permitido por CORS'))
        }
    },
    optionsSuccessStatus: 200 // Algunos navegadores antiguos pueden fallar con 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));


app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})



app.use('/producto', routerProducto)
app.use('/usuario', routerUsuario)
app.use('/carbono', routerCarbono)

const port = 5241
app.listen(port, () => {
    console.log('Listening on port ' + port)
})