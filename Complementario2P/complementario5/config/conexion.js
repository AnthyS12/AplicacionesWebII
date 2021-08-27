let mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Anthony:123@cluster0.a5uj9.mongodb.net/SSR?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose;

