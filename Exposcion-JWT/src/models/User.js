const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
})

//metodo que encripta la contrasena
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

//metodo que validar la contrasena
userSchema.methods.validatePassword = function (password) {    
    return bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);