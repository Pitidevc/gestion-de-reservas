const mongoose = require('mongoose');
const usuario = require('./usuario');

const limpiadorSchema = new mongoose.Schema({
    usuario : { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    estadoTrabajo: { type: String, required: true, enum: ['disponible', 'ocupado'], default: 'disponible' },
    estadoGeneral: { type: String, required: true, enum: ['activo', 'inactivo'], default: 'activo' },
});

module.exports = mongoose.model('Limpiadores', limpiadorSchema);