const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const licenciaMiddleware = require('../middleware/licenciaMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const Usuario = require('../models/usuario');
const Apartamento = require('../models/apartamento');
const limpiador = require('../models/limpiadores');
const limpieza = require('../models/limpieza');
const Reserva = require('../models/reserva');
const registroController = require('../controllers/registroContoller');
const reservaController = require('../controllers/reservaController');
const limpiezaController = require('../controllers/limpiezaController');
const licenciaController = require('../controllers/licenciaController');
const Licencia = require('../models/licencia');

router.post('/login', authController.autenticarUsuario);

//Obtener los datos de la licencia
router.get('/datos-licencia', licenciaController.obtenerLicencia);

//Renovar la licencia
router.post('/super-admin/renovar/:id', licenciaController.renovarLicencia);

//Suspender la licencia
router.post('/super-admin/suspender/:id', licenciaController.suspenderLicencia);

// Cerrar sesión (logout)
router.post('/logout', authController.cerrarSesion);

//Verificar licencia para el resto de rutas, de aqui para abajo verifica la licencia siempre
router.use(licenciaMiddleware.verificarLicencia);

router.get('/verificar-cedula/:cedula', registroController.verificarCedula);

//Verificar el apartamento si ya existe por su numero y por su piso
router.get('/verificar-apartamento/:numero/:piso', registroController.verificarApartamento);

//Logica apartamentos disponibles
router.get('/apartamentos-disponibles', registroController.apartamentosDisponibles);

router.get('/apartamentos-limpieza', limpiezaController.apartamentosLimpieza);

router.get('/limpiadores-disponibles', limpiezaController.limpiadoresDisponibles);

router.get('/limpiadores', limpiezaController.todosLosLimpiadores);


//logica de eliminar limpiador (ya no cambia estado lo elimina definitivamente de la base de datos)
router.delete('/cambiar-estado-limpiador/:id', authMiddleware.verificarSesionYRolParaBorrado, limpiezaController.cambiarEstadoLimpiador);

// router.get('/tareas-limpieza', );

router.post('/agregar-apartamento', registroController.registrarApartamento);

router.post('/agregar-usuario-limpiador', registroController.registrarLimpiadorCompleto);

router.post('/agregar-limpieza', registroController.registrarlimpieza);

router.post('/crear-reserva', reservaController.CrearReserva);

router.get('/ver-reservas', reservaController.ObtenerReservas);

router.get('/obtener-una-reserva/:id', reservaController.ObtenerUNAReserva);

router.put('/actualizar-reserva/:id', reservaController.ActualizarReserva);

router.get('/limpiezas-pendientes', limpiezaController.obtenerTareasLimpieza);

router.get('/obtener-user-limpieza', limpiezaController.ObteneruserLimpieza);

router.post('/cambiar-estado-limpieza', limpiezaController.cambiarEstadoLimpieza);

router.get('/usuario-actual', authController.obtenerDatosUsuario);

router.post('/cambiar-contrasena', authController.cambiarContrasena);

router.post('/cambiar-contrasena', authController.cambiarContrasena);

router.get('/verReservaMes', reservaController.verReservaMes);

//Eliminar una reserva
router.delete('/eliminar-reserva/:id', authMiddleware.verificarSesionYRolParaBorrado, reservaController.EliminarReserva);

module.exports = router;