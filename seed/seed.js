

const mongoose = require('mongoose');
require('dotenv').config();
const Usuario = require('../src/models/usuario');
const Licencia = require('../src/models/licencia');
const bcrypt = require('bcrypt');

async function seed() {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        const adminPassword = await bcrypt.hash('Admin123', 10);
        const recePassword = await bcrypt.hash('Recep123', 10);
        const superAdminPassword = await bcrypt.hash('SuperAdmin123', 10);

        await Usuario.insertMany([
            {nombre: 'administrador', password: adminPassword, rol: 'admin' },
            {nombre: 'recepcionista', password: recePassword, rol: 'recepcionista' },
            {nombre: 'superAdmin', password: superAdminPassword, rol: 'admin' }

        ]);
        console.log('Datos de usuarios insertados correctamente');

        const Fecha = new Date();
        const unMesDespues = Fecha.getMonth() + 1;
        Fecha.setMonth(unMesDespues);
        await Licencia.insertOne(
            { estadoLicencia: 'activa', fechaVencimiento: Fecha }
        );
        console.log('Licencia inicial insertada correctamente');

        process.exit(0);
        
    } catch (error) {
        process.exit(1);
    }
}

seed();



