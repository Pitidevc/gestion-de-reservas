const Licencia = require('../models/licencia');

exports.obtenerLicencia = async (req, res) => {
    try {
        // Buscamos el único documento de licencia existente
        const licencia = await Licencia.findOne();

        if (!licencia) {
            return res.status(404).json({ 
                ok: false, 
                mensaje: "No se encontró información de la licencia." 
            });
        }

        // Devolvemos los datos necesarios
        res.json({
            ok: true,
            id: licencia._id,
            estado: licencia.estadoLicencia,
            vencimiento: licencia.fechaVencimiento,
            ultimaRenovacion: licencia.ultimaRenovacion,
            // calculamos los días restantes desde el servidor
            diasRestantes: Math.ceil((new Date(licencia.fechaVencimiento) - new Date()) / (1000 * 60 * 60 * 24))
        });

    } catch (error) {
        console.error("Error al obtener licencia:", error);
        res.status(500).json({ 
            ok: false, 
            mensaje: "Error interno del servidor" 
        });
    }
};


exports.renovarLicencia = async (req, res) => {
    // Verificamos la llave del HTML
    const auth = req.headers['authorization'];

    if (auth !== 'Reserva99') {
        return res.status(403).json({ ok: false, mensaje: "Llave maestra incorrecta" });
    }

    try {
        const { id } = req.params;
        const hoy = new Date();
        const vencimiento = new Date();
        vencimiento.setDate(hoy.getDate() + 30); // Sumar 30 días

        await Licencia.findByIdAndUpdate(id, {
            estadoLicencia: 'activa',
            fechaVencimiento: vencimiento,
            ultimaRenovacion: hoy
        });

        res.json({ ok: true, mensaje: "Licencia extendida 30 días con éxito" });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: "Error en el servidor" });
    }
};

exports.suspenderLicencia = async (req, res) => {
    const auth = req.headers['authorization'];

    if (auth !== 'Reserva99') {
        return res.status(403).json({ ok: false, mensaje: "Llave maestra incorrecta" });
    }

    try {
        const { id } = req.params;
        await Licencia.findByIdAndUpdate(id, { estadoLicencia: 'suspendida' });
        res.json({ ok: true, mensaje: "Acceso cortado correctamente" });
    } catch (error) {
        res.status(500).json({ ok: false });
    }
};