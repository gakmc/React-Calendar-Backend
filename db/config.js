const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.DB_CNN
        //     ,{
        //     useNewUrlParser:true,
        //     useUnifiedTopology:true,
        //     useCreateIndex: true
        // }
    );

    console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion con la base de datos');
    }
}


module.exports = {
    dbConnection
}