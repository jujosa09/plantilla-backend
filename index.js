require('./db/mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const {routerEvento} = require('./routes/routerEvento')
const {routerUsuario} = require('./routes/usuarioRoute')
const allowedOrigins = [
    'https://plantilla-backend.vercel.app',
    'http://localhost:5173'
];

const corsOptions = {
    origin: 'https://plantilla-frontend.vercel.app',
    optionsSuccessStatus: 200 // Algunos navegadores antiguos pueden fallar con 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));


app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})

app.use('/evento', routerEvento)
app.use('/usuario', routerUsuario)

const port = 5241
app.listen(port, () => {
    console.log('Listening on port ' + port)
})