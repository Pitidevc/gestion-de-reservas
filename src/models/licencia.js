const mongoose = require('mongoose');

const LicenciaSchema = new mongoose.Schema({
    estadoLicencia: {type: String, required: true, enum: ['activa', 'suspendida'], default: 'activa'},
    fechaVencimiento: Date,
    ultimaRenovacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Licencia', LicenciaSchema);