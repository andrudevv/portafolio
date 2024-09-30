const express = require('express');
const userRouter = require('./users.Routes.js');
const networkRouter = require('./networks.Routes.js');
const technologyRouter = require('./technologies.Routes.js')

function rutas(app) {
    const router = express.Router();
    app.use('/tech',router);
    router.use('/users', userRouter);
    router.use('/networks', networkRouter);
    router.use('/technologies', technologyRouter);
     /// EXPERIENCES
     /// PROYECTOS
    
    
}
module.exports = rutas ;