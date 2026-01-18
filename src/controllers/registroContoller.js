const Apartamento = require('../models/apartamento');
const Limpiador = require('../models/limpiadores');
const usuarioModel = require('../models/usuario');
const Reserva = require('../models/reserva');
const AsignacionLimpieza = require('../models/limpieza');
const bcrypt = require('bcrypt');


exports.verificarApartamento = async (req, res) => {
    try {
        const { numero, piso } = req.params;
        // Buscamos en la colección de Apartamentos
        const existe = await Apartamento.findOne({ numero: numero, piso: piso });
        
        if (existe) {
            return res.json({ existe: true, mensaje: 'Este apartamento ya está registrado' });
        }
        
        res.json({ existe: false });
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el apartamento' });
    }
};

//Logica apartamentos disponibles
// Definimos cuánto tiempo mínimo necesitas para limpiar (ej. 3 horas)
const HORAS_LIMPIEZA = 3;

exports.apartamentosDisponibles = async (req, res) => {

    try {

        const { fechaIn, horaIn, fechaOut, horaOut } = req.query;

    if (!fechaIn || !fechaOut) return res.json([]);

    const inicioPedido = new Date(`${fechaIn}T${horaIn || '15:00'}:00`);
    const finPedido = new Date(`${fechaOut}T${horaOut || '11:00'}:00`);
    const inicioConBuffer = new Date(inicioPedido);
    const finConBuffer = new Date(finPedido);
    inicioConBuffer.setHours(inicioConBuffer.getHours() - HORAS_LIMPIEZA); //restamos las horas de limpieza a la hora de entrada para que en caso tal
                                                                           // de una reserva seguida la fecha de incio se cruce con la final y salga ocupado
    finConBuffer.setHours(finConBuffer.getHours() + HORAS_LIMPIEZA);
    // Buscamos reservas donde el intervalo (Entrada < FinPedido) Y (Salida > InicioPedido - Horas de limpieza)
    const ocupados = await Reserva.find({
        estado: 'activa',
        fechaIngreso: { $lt: finConBuffer },
        fechaSalida: { $gt: inicioConBuffer}
    }).select('apartamento');

    const id_ocupado = ocupados.map(res => res.apartamento); //Obtenemos los IDs de los aptos ocupados

    const disponibles = await Apartamento.find({ _id: { $nin: id_ocupado} });
    res.status(200).json({ok: true, disponibles});
        
    } catch (error) {
        console.error("Error crítico en disponibilidad:", error);
        res.status(500).json({ok: false, mensaje: "Error al calcular disponibilidad" });  
    }

    
};

exports.registrarApartamento = async (req, res) => {
    try {
        const { numero, piso, camas, banos } = req.body;
        const nuevoApartamento = new Apartamento({ numero, piso, camas, banos });
        await nuevoApartamento.save();
        res.status(200).json({ ok: true, mensaje: 'Apartamento registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar apartamento' });
    }
};



exports.verificarCedula = async (req, res) => {
    const { cedula } = req.params;
    // Lógica para verificar la cédula en la base de datos
    const existe = await Usuario.findOne({ nombre: cedula });
        
        try {
            const { cedula } = req.params;
            // Buscamos si existe un usuario con esa cédula
            const existe = await Usuario.findOne({ nombre: cedula });
            
            if (existe) {
                return res.json({ existe: true, mensaje: 'Esta cédula ya está registrada' });
            }
            
            res.json({ existe: false });
        } catch (error) {
            res.status(500).json({ error: 'Error al verificar' });
        }
};

exports.registrarLimpiadorCompleto = async (req, res) => {
    try {
        const { cedula, password, rol, nombre, apellido, estadoTrabajo, estadoGeneral } = req.body;

        // 1. Crear el Usuario (Credenciales)
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = new usuarioModel({ 
            nombre: cedula,
            password: hashedPassword, 
            rol,
        });

        // guardar y MongoDB genera el ID automáticamente
        const usuarioGuardado = await nuevoUsuario.save();

        // 2. Crear el Perfil de Limpiador usando el ID anterior
        const nuevoLimpiador = new Limpiador({ 
            nombre, 
            apellido, 
            estadoTrabajo, 
            estadoGeneral,
            usuario: usuarioGuardado._id // <--- capturar el ID generado
        });

        await nuevoLimpiador.save();

        res.status(201).json({ 
            ok: true, 
            mensaje: 'Usuario y perfil de limpiador creados correctamente' 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: 'Error en el registro integral' });
    }
};

exports.registrarlimpieza = async (req, res) => {
    try {
        const { apartamento, limpiador, estado } = req.body;
        const creadoEn = new Date();

        //verificar que el apartamento y el limpiador no tengan asignacion
        const asignacionExistente = await AsignacionLimpieza.findOne({
            apartamento: apartamento,
            // Evitar nuevas asignaciones si ya existe una pendiente o en curso
            estado: { $in: ['pendiente', 'en curso'] }
        });

        if (asignacionExistente) {
            return res.status(400).json({ ok: false, mensaje: 'Este apartamento ya tiene una tarea de limpieza pendiente o en progreso.' });
        }

        const nuevaAsignacion = new AsignacionLimpieza({ apartamento, limpiador, estado, creadoEn });
        await nuevaAsignacion.save();

        if(nuevaAsignacion){
            // Actualizar el estado del limpiador a 'ocupado'
            await Limpiador.findByIdAndUpdate(limpiador, { estadoTrabajo: 'ocupado' });
            await Apartamento.findByIdAndUpdate(apartamento, { estado: 'mantenimiento' });
        }


        res.status(200).json({ ok: true, mensaje: 'Tarea de limpieza registrada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar tarea de limpieza' });
    }
};