const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User');

router.post('/signup', async (req, res, next) =>{
    const {username, email, password} = req.body;
    const user = new User ({
        username,
        email,
        password

    })
    //console.log(username,email, password)
    user.password = await user.encryptPassword(user.password); //recibe la contrasena y la encripta
    //console.log(user)
    await user.save();

    // Creacion del Token 
    const token = jwt.sign({id: user._id}, config.secret, {
        //Expiracion del token, este caso 24h - 60 s * 60min *24 h = 86400
        expiresIn: 60 * 60 * 24 
    })
    res.json({auth: true, token })
    //res.json({message:'Mensaje Recibido'})
})

router.get('/me', async (req, res, next) =>{
    // verifica si tiene token 
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No posees un token'
        });
    }
    //decodifica el token
    const decoded = jwt.verify(token, config.secret);
    //console.log(decoded)
    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(404).send('Usuario no encontrado');
    }


    res.json(user);
})

router.post('/signin', async (req, res, next) =>{
    const{email, password } = req.body;
    const user = await User.findOne({email:email});
    if (!user) {
        return res.status(404).send('El email no existe');
    }

    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
        return res.status(401).json({auth: false, token:null });
    }

    // Creacion del Token 
    const token = jwt.sign({id: user._id}, config.secret, {
        //Expiracion del token, este caso 24h - 60 s * 60min *24 h = 86400s
        expiresIn: 60 * 60 * 24 
    });

    //console.log(passwordIsValid)
    res.json({auth: true, token });
})

/*
router.get('/me', (req, res, next) =>{
    res.json('me');
})
*/
module.exports = router ; 