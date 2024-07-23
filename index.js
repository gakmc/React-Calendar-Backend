const express = require("express");
const { dbConnection } = require("./db/config");
const cors = require('cors');
require('dotenv').config();

//*Crear el server de express
const app = express();

//*Conexion a BBDD
dbConnection();

//*CORS
app.use(cors());

//*Directorio Publico
app.use(express.static('public'));

//* Lectura y parseo del Body
app.use(express.json());

//*Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.use('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
//*Listener de peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server arriba, en el puerto ${process.env.PORT}`);
});
