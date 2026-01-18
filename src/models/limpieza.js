const mongoose = require('mongoose');

const asignacionLimpiezaSchema = new mongoose.Schema({
    // Relaciones
    apartamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartamento',
        required: true
    },
    limpiador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Limpiadores',
        required: true
    },
    // Control
    estado: {
        type: String,
        enum: ['pendiente', 'en curso', 'completado', 'atrasado'],
        default: 'pendiente'
    },
    creadoEn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AsignacionLimpieza', asignacionLimpiezaSchema);