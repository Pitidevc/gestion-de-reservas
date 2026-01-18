const Reserva = require('../models/reserva');
const Apartamento = require('../models/apartamento');


exports.CrearReserva = async (req, res) => {
    try {
        const { 
            entrada, 
            horEntrada, 
            salida, 
            horSalida, 
            origen, 
            apartamento, 
            cliente, 
            celular, 
            acompanantes, 
            valor, 
            observaciones 
        } = req.body;
            
        const inicioPedido = new Date(`${entrada}T${horEntrada || '15:00'}:00`);
        const finPedido = new Date(`${salida}T${horSalida || '11:00'}:00`);
        
        const nuevaReserva = new Reserva({
            apartamento,
            fechaIngreso : new Date(inicioPedido),
            fechaSalida : new Date(finPedido),
            horaIngreso: horEntrada,
            horaSalida: horSalida,
            cliente,
            celular,
            origen,
            acompanantesDetalle: acompanantes,
            importe: parseFloat(valor),
            observaciones
        });
        await nuevaReserva.save();

        return res.status(201).json({ ok: true, mensaje: 'Reserva creada exitosamente' });
    } catch (error) {
        return res.status(500).json({ ok: false, mensaje: 'Error al crear la reserva' });
    }
};


exports.ObtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find({estado: 'activa'}).populate('apartamento');
        if(reservas.length === 0){
            return res.status(200).json({ ok: true, mensaje: 'No hay reservas registradas', reservas: [] });
        }
        res.status(200).json({ ok: true, reservas, mensaje : 'Reservas obtenidas exitosamente' });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error al obtener las reservas' });
    }   
};

exports.ObtenerUNAReserva = async (req, res) => {
    try {
        const {id} = req.params;
        const reserva = await Reserva.findOne({_id: id, estado: 'activa'})
        if(reserva.length === 0){
            return res.status(200).json({ ok: true, mensaje: 'No hay reservas registradas', reservas: [] });
        }
        res.status(200).json({ ok: true, reserva, mensaje : 'Reservas obtenidas exitosamente' });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error al obtener las reservas' });
    }   
};

exports.ActualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            "edit-HoraIngreso": horaIngreso, 
            "editHora-Salida": horaSalida, 
            "edit-Acompanantes": acompanantes, 
            "edit-Observaciones": observaciones, 
            "edit-confirmada": confirmada 
        } = req.body;

        // Buscamos la reserva actual para recuperar las fechas originales
        const reservaExistente = await Reserva.findById(id);
        if (!reservaExistente) {
            return res.status(404).json({ ok: false, mensaje: "Reserva no encontrada" });
        }

        // 2. Extraemos solo la parte de la FECHA de los objetos Date originales
        
        const fechaInBase = reservaExistente.fechaIngreso.toISOString().split('T')[0];
        const fechaOutBase = reservaExistente.fechaSalida.toISOString().split('T')[0];

        // 3. Creamos los nuevos objetos Date uniendo Fecha Vieja + Hora Nueva
        // Si horaIngreso viene como "Sin confirmar", usamos el default '15:00'
        const hIn = (horaIngreso && horaIngreso !== 'Sin confirmar') ? horaIngreso : '15:00';
        const hOut = (horaSalida && horaSalida !== 'Sin confirmar') ? horaSalida : '11:00';

        const nuevaFechaIngreso = new Date(`${fechaInBase}T${hIn}:00`);
        const nuevaFechaSalida = new Date(`${fechaOutBase}T${hOut}:00`);

        // 4. Actualizamos
        const reservaActualizada = await Reserva.findByIdAndUpdate(
            id,
            {
                horaIngreso: horaIngreso || '',
                horaSalida: horaSalida || '',
                acompanantesDetalle: acompanantes,
                observaciones,
                // Convertimos el valor del select a booleano
                confirmada: confirmada === 'true', 
                fechaIngreso: nuevaFechaIngreso,
                fechaSalida: nuevaFechaSalida
            },
            { new: true }
        );

        res.status(200).json({ 
            ok: true, 
            mensaje: "Reserva actualizada con éxito", 
            reserva: reservaActualizada 
        });

    } catch (error) {
        console.error("Error al actualizar:", error);
        res.status(500).json({ ok: false, mensaje: "Error al procesar la actualización" });
    }
};


exports.verReservaMes = async (req, res) => {
    try {
        const { mes, anio } = req.query;

        // 1. Crear el rango de búsqueda: desde el primer día hasta el último del mes
        // mes - 1 porque en JS los meses van de 0 a 11
        const fechaInicioMes = new Date(anio, mes - 1, 1, 0, 0, 0);
        const fechaFinMes = new Date(anio, mes, 0, 23, 59, 59);

        // 2. Buscar reservas que se solapen con este mes
        const reservas = await Reserva.find({
            $or: [
                // Caso 1: La reserva empieza dentro del mes
                { fechaIngreso: { $gte: fechaInicioMes, $lte: fechaFinMes } },
                
                // Caso 2: La reserva termina dentro del mes
                { fechaSalida: { $gte: fechaInicioMes, $lte: fechaFinMes } },
                
                // Caso 3: La reserva empezó antes y termina después (cruza todo el mes)
                {
                    $and: [
                        { fechaIngreso: { $lte: fechaInicioMes } },
                        { fechaSalida: { $gte: fechaFinMes } }
                    ]
                }
            ]
        })
        .populate('apartamento') // Crucial para mostrar el número del apto en el frontend
        .sort({ fechaIngreso: 1 }); // Ordenar por fecha de llegada

        // 3. Responder al cliente
        res.status(200).json(reservas);

    } catch (error) {
        console.error("Error en verReservaMes:", error);
        res.status(500).json({ 
            mensaje: "Error al obtener las reservas del mes",
            error: error.message 
        });
    }
};

//Eliminar una reserva
exports.EliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reservaEliminada = await Reserva.findByIdAndDelete(
            { _id: id }
        );
        if(!reservaEliminada){
            return res.status(404).json({ ok: false, mensaje: "Reserva no encontrada" });
        }
        res.status(200).json({ ok: true, mensaje: "Reserva eliminada con éxito", reserva: reservaEliminada });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: "Error al eliminar la reserva" });
    }
}