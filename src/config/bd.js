const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); //uso de await para esperar la conexion y se usa proces.env para variables de entorno y mongo uri tiene la url de la bd
        console.log('BD Conectada');
    } catch (error) {
        console.error('Error de conexion a la BD:', error); 
        process.exit(1); //salir del proceso con codigo de error 1 
    }
};

module.exports = conectarDB;