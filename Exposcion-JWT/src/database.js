const mongoose = require ('mongoose');
/*
const usuario = "Anthony"
const password = "123"
const dbName = "simplejwt"

const uri = `mongodb+srv://Anthony:123@cluster0.a5uj9.mongodb.net/simplejwtretryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))
*/
mongoose.connect('mongodb://localhost:27017/simplejwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
