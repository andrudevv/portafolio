const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {connectToDatabase} = require('./db/conexion.js');
const  rutas  = require('./routes/index.js');
const path = require('path');
require('dotenv').config();
const app = express();
// const { bodyParser } = require('body-parser');
// const { config } = require('./config/config.js')
const port = 4000 ; 
//app.use(cors({
    // origin: 'http://localhost:5173',
    // credentials: true, // This is important as it allows us to send cookies along with the request
    //}));
    
    // app.use(express.static(path.join(__dirname, '../../uploads')));
app.use('/tecnologias', express.static(path.join(__dirname, '../src/db/technology')));
app.use('/redes-sociales', express.static(path.join(__dirname, '../src/db/network')));
app.get('/IMG', (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Imagen</h1>
                <img src="/tecnologias/REACT.png" alt="react" style="width:200px; height:200px;" />
            </body>
        </html>
    `);
});
app.use(morgan('dev'));
app.use(express.json())
app.use(cookieParser());
rutas(app);

connectToDatabase();
app.listen(port, ()=>{
    console.log(`corriendo en el puerto ${port}`);
})


