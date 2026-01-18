const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    apartamento: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Apartamento', 
        required: true
    },
    
    // FECHAS (Obligatorias)
    fechaIngreso: { type: Date, required: true },
    fechaSalida: { type: Date, required: true },

    // HORAS (Opcionales - tipo String para que digan "Pendiente" o la hora)
    horaIngreso: { type: String, default: 'Por confirmar' },
    horaSalida: { type: String, default: 'Por confirmar' },
    
    cliente: { type: String, required: true },
    celular: { type: String, required: true },
    
    origen: { 
        type: String, 
        enum: ['Airbnb', 'Booking', 'Facebook', 'Propia'],
        default: 'Propia'
    },

    acompanantesDetalle: { type: String }, 
    importe: { type: Number, required: true },
    observaciones: { type: String },
    
    // ESTADOS
    confirmada: { type: Boolean, default: false },
    estado: { 
        type: String, 
        enum: ['activa', 'terminada', 'cancelada'], 
        default: 'activa' 
    },
    
    fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reserva', reservaSchema);