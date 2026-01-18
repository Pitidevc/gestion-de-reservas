const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    password: {type: String, required: true},
    rol: {type: String, required: true, enum: ['admin', 'recepcionista', 'limpiador']},
});

module.exports = mongoose.model('Usuario', usuarioSchema);