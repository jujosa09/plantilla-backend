require('dotenv').config()
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(`mongodb+srv://jujosadols:${process.env.MONGO_PASSWD}@cluster0.kc9dnvs.mongodb.net/examen?retryWrites=true&w=majority`) 

.then(() => {
    console.log('Connected to Mongo')
})
.catch((error) => {
    console.log('Error ocurred connecting Mongo: ', error)
})

module.exports = mongoose