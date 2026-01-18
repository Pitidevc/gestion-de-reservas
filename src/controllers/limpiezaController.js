const limpieza = require('../models/limpieza');
const limpiador = require('../models/limpiadores');
const Apartamento = require('../models/apartamento');

exports.apartamentosLimpieza = async (req, res) => {
    try {
        const disponibles = await Apartamento.find({ estado: 'limpieza' });
        res.json(disponibles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener apartamentos disponibles' });
    }       
};

exports.limpiadoresDisponibles = async (req, res) => {
    try {
        const disponibles = await limpiador.find({ estadoTrabajo: 'disponible', estadoGeneral: 'activo' });

        res.json(disponibles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener limpiadores disponibles' });
    }
};

exports.todosLosLimpiadores = async (req, res) => {
    try {
        const limpiadoresList = await limpiador.find().populate('usuario');
        res.status(200).json({ ok: true, limpiadoresList });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de limpiadores' });
    }
};

// Controlador para obtener las tareas de limpieza asignadas a un limpiador específico
exports.obtenerTareasLimpieza = async (req, res) => {
    try {
        const estados = ['pendiente', 'en curso', 'atrasado'];
        const iduser = req.session.userID;

        // Buscar el limpiador asociado al usuario actual
        const limpiadorAsignado = await limpiador.findOne({ usuario: iduser });
        if (!limpiadorAsignado) {
            return res.status(404).json({ ok: false, error: 'Limpiador no encontrado para el usuario actual' });
        }
        const tareas = await limpieza.find({ estado: { $in: estados }, limpiador: limpiadorAsignado._id }).populate('apartamento').populate('limpiador');

        if(tareas.length === 0){
            return res.status(200).json({ ok: true, tareas: [], mensaje: 'No hay tareas de limpieza pendientes' });
        }
        res.status(200).json({ ok: true, tareas, mensaje: 'Tareas de limpieza obtenidas correctamente' });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: 'Error al obtener las tareas de limpieza' });
    }
};

exports.ObteneruserLimpieza = async (req, res) => {
    try {
        const iduser = req.session.userID;
        const limpiadorAsignado = await limpiador.findOne({ usuario: iduser });
        if (!limpiadorAsignado) {
            return res.status(404).json({ ok: false, error: 'Limpiador no encontrado para el usuario actual' });
        }
        res.status(200).json({ ok: true, limpiador: limpiadorAsignado });
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Error al obtener el limpiador' });
    }
};

exports.cambiarEstadoLimpieza = async (req, res) => {
    
    try {
        const { tareaId, nuevoEstado } = req.body;
        if(nuevoEstado === 'en curso'){

            const tarea = await limpieza.findById(tareaId);
            const apto = await Apartamento.findById(tarea.apartamento);
            const limpiadorAsignado = await limpiador.findById(tarea.limpiador);
            if (!tarea) {
                return res.status(404).json({ ok: false, error: 'Tarea no encontrada' });
            }
            tarea.estado = nuevoEstado;
            await tarea.save();

            //Usar socket.io para notificar al admin sobre la tarea atrasada
            const io = req.app.get('socketio');
            io.emit('limpiezaCurso', { limpieza: tarea._id, aparta: apto.numero, limpiador: limpiadorAsignado.nombre + limpiadorAsignado.apellido });

            res.status(200).json({ ok: true, mensaje: 'Estado de la tarea actualizado correctamente' });

        }else if(nuevoEstado === 'atrasado'){

            const tarea = await limpieza.findById(tareaId);
            const apto = await Apartamento.findById(tarea.apartamento);
            const limpiadorAsignado = await limpiador.findById(tarea.limpiador);
            if (!tarea) {
                return res.status(404).json({ ok: false, error: 'Tarea no encontrada' });
            }
            tarea.estado = nuevoEstado;
            await tarea.save();


            //Usar socket.io para notificar al admin sobre la tarea atrasada
            const io = req.app.get('socketio');
            io.emit('limpiezaAtrasada', { limpieza: tarea._id, aparta: apto.numero, limpiador: limpiadorAsignado.nombre + limpiadorAsignado.apellido });

            res.status(200).json({ ok: true, mensaje: 'Estado de la tarea actualizado correctamente' });

        }else if(nuevoEstado === 'completado'){

            const tarea = await limpieza.findById(tareaId);
            const apto = await Apartamento.findById(tarea.apartamento);
            const limpiadorAsignado = await limpiador.findById(tarea.limpiador);
            if (!tarea) {
                return res.status(404).json({ ok: false, error: 'Tarea no encontrada' });
            }
            tarea.estado = nuevoEstado;
            await tarea.save();

            //Usar socket.io para notificar al admin sobre la tarea atrasada
            const io = req.app.get('socketio');
            io.emit('limpiezaCompletada', { limpieza: tarea._id, aparta: apto.numero, limpiador: limpiadorAsignado.nombre + limpiadorAsignado.apellido });

            // Actualizar el estado del apartamento a 'disponible'
            const apartamento = await Apartamento.findById(tarea.apartamento);
            if (apartamento) {
                apartamento.estado = 'Limpio';
                await apartamento.save();
            }

            //Actualizar el estado del limpiador a 'disponible'
            if(limpiadorAsignado){
                limpiadorAsignado.estadoTrabajo = 'disponible';
                await limpiadorAsignado.save();
            }
            res.status(200).json({ ok: true, mensaje: 'Estado de la tarea actualizado correctamente' });
        }
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Error al actualizar el estado de la tarea' });
    }

};


// Controlador para cambiar eliminar un limpiador (ya no cambiamos el estado lo eliminamos definitivamente de la base de datos)
exports.cambiarEstadoLimpiador = async (req, res) => {
    try {
        const { id } = req.params;

        const limpOcu = await limpiador.findOne({ _id: id, estadoTrabajo: 'disponible' });

        if(!limpOcu){
            return res.status(400).json({ ok:false, mensaje: 'No se puede eliminar el limpiador porque tiene tareas asignadas' });
        }
        const limpiadorac = await limpiador.findOneAndDelete({ _id: id });
        if (!limpiadorac) {
            return res.status(404).json({ ok:false, mensaje: 'Limpiador no encontrado' });
        }

        res.json({ ok: true, mensaje: `Limpiador eliminado correctamente` });
    } catch (error) {
        res.status(500).json({ok: false, mensaje: 'Error al eliminar el limpiador' });
    }
};

exports.tareasLimpieza = async (req, res) => {
    try {
        const tareas = await limpieza.find()
            .populate('apartamento')
            .populate('limpiador');
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tareas de limpieza' });
    }
};