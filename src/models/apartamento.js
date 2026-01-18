const mongoose = require('mongoose');

const apartamentoSchema = new mongoose.Schema({
    numero: {type: String, required: true, unique: true},
    piso: {type: Number, required: true},
    camas: {type: Number, required: true},
    banos: {type: Number, required: true},
    estado: {type: String, required: true, enum: ['Limpio', 'limpieza'], default: 'Limpio'}
});

module.exports = mongoose.model('Apartamento', apartamentoSchema);