require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const bd = require('./src/config/bd');
const user = require('./src/models/usuario');
const licencia = require('./src/models/licencia');
const apartamento = require('./src/models/apartamento');
const limpiador = require('./src/models/limpiadores');
const limpieza = require('./src/models/limpieza');
const Reserva = require('./src/models/reserva');
const comprobarSesion = require('./src/middleware/authMiddleware');
const cors = require('cors');
const path = require('path');
const reservaRoutes = require('./src/routes/reservaRoutes');
const session = require('express-session');


const app = express();

// Usar Socket.io para notificaciones en tiempo real
const {Server} = require("socket.io"); // Importar la clase Server de socket.io para crear el servidor de WebSocket
const http = require("http"); // Importar el módulo http de Node.js para crear un servidor HTTP que se pueda usar con Socket.io

const servidor =  http.createServer(app); // Crear el servidor HTTP usando la aplicación Express
const io = new Server(servidor, { // Crear una instancia de Socket.io y asociarla con el servidor HTTP
  cors: { 
            origin: "*", // Permitir conexiones (se puede poner el host específico o la url de la app)
            methods: ["GET", "POST", "PUT", "DELETE"] // Métodos HTTP permitidos
        } 
});

io.on('connection', (socket) => { // Escuchar el evento de conexión de un nuevo cliente
    console.log('Nuevo cliente conectado:', socket.id); // 
    socket.on('disconnect', () => { 
        console.log('Cliente desconectado:', socket.id);
    });
});
app.set('socketio', io);


app.use(session({
    secret: 'SessionOn', // frase para encriptar la sesión
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } //   true para HTTPS más adelante
}));
app.use(express.json());
app.use(express.urlencoded ({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'views', 'public')));
app.use('/api/reserva', reservaRoutes);


//rutas protegidas
app.get('/admin', comprobarSesion.verificarSesion, comprobarSesion.verificarRol('admin'), (req, res) => {

        res.sendFile(path.join(__dirname, 'views', 'private', 'admin.html'));
  
});
app.get('/recepcionista', comprobarSesion.verificarSesion, comprobarSesion.verificarRol('recepcionista'), (req, res) => {
  
    res.sendFile(path.join(__dirname, 'views', 'private', 'recepcionista.html'));
});
app.get('/limpiador', comprobarSesion.verificarSesion, comprobarSesion.verificarRol('limpiador'), (req, res) => {
    
    res.sendFile(path.join(__dirname, 'views', 'private', 'limpiador.html'));
});
app.get('/superAdmin', comprobarSesion.verificarSesion, (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'private', 'superAdmin.html'));
});



app.use('/private', comprobarSesion.verificarSesion, express.static(path.join(__dirname, 'views', 'private')));


app.get('/', comprobarSesion.redireccionarSiLogueado, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'public', 'index.html'));
});


//verificar fecha de salida de los apartamentos automaticamente
// Se ejecuta cada minuto


// verificar fecha de salida de los apartamentos automaticamente
cron.schedule('* * * * *', async () => {
    try {
        const ahora = new Date();
        
        // 1. Buscamos reservas que ya terminaron y siguen 'activas'
        const reservasVencidas = await Reserva.find({
            fechaSalida: { $lte: ahora }, 
            estado: 'activa'
        });

        if (reservasVencidas.length > 0) {
            for (const reser of reservasVencidas) {
                try {
                    // 2. Cambiamos el estado del apartamento a limpieza
                    await apartamento.findByIdAndUpdate(reser.apartamento, { estado: 'limpieza' });
                    
                    // 3. Marcamos la reserva como 'terminada'
                    reser.estado = 'terminada';
                    await reser.save();
                    
                    console.log(`Apartamento ${reser.apartamento} enviado a limpieza (Reserva finalizada).`);
                } catch (err) {
                    console.error(`Error procesando reserva ${reser._id}:`, err);
                }
            }
        }
    } catch (error) {
        console.error("Error en el cron de verificación:", error);
    }
});

// Conectar a la base de datos
bd();
const PORT = process.env.PORT || 3000;
servidor.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
