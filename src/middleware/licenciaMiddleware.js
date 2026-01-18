const Licencia = require('../models/licencia');

exports.verificarLicencia = async (req, res, next) => {
    try {
        const licencia = await Licencia.findOne();
        
        if (!licencia) {
            return res.status(404).json({ ok: false, mensaje: "No se encontró el registro de licencia" });
        }

        const ahora = new Date();
        const vencimiento = new Date(licencia.fechaVencimiento);

        // 1. Verificación por Fecha (Corte automático)
        if (ahora > vencimiento) {
            if (licencia.estadoLicencia === 'activa') {
                await Licencia.findByIdAndUpdate(licencia._id, { 
                    estadoLicencia: 'suspendida' 
                });
            }
            return res.status(402).json({ 
                ok: false, 
                mensaje: "Acceso suspendido: Licencia vencida el " + vencimiento.toLocaleDateString()
            });
        }

        // 2. Verificación por Estado (Corte manual)
        if (licencia.estadoLicencia !== 'activa') {
            return res.status(402).json({ 
                ok: false, 
                mensaje: "Acceso suspendido: El estado de su cuenta es " + licencia.estadoLicencia 
            });
        }

        // Si pasó ambas pruebas, adelante
        next();
        
    } catch (error) {
        console.error("Error Middleware Licencia:", error);
        res.status(500).json({ ok: false, mensaje: "Error validando licencia" });
    }
};