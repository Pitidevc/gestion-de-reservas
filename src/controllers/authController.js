const usuarioModel = require('../models/usuario');
const licenciaMiddleware = require('../middleware/licenciaMiddleware');
const bcrypt = require('bcrypt');



exports.autenticarUsuario = async (req, res) => {

    try {

        const nombre = req.body.usuario;
        const password = req.body.contraseña;
        const rol = req.body.rol;
        

        const resultadoconsulta = await usuarioModel.findOne({ nombre: nombre, rol: rol });
        const ValidarPassword = await bcrypt.compare(password, resultadoconsulta ? resultadoconsulta.password : '');
        if(!ValidarPassword){
            return res.status(401).json({ ok:false , mensaje: 'Credenciales inválidas' });
        } 
        if(!resultadoconsulta){
            res.status(401).json({ ok:false , mensaje: 'Credenciales inválidas' });
        }else {
            if(resultadoconsulta.rol === 'admin' && resultadoconsulta.nombre === "superAdmin"){
                req.session.userID = resultadoconsulta._id;
                req.session.rol = resultadoconsulta.rol;
                res.status(200).json({ ok:true , mensaje: 'Autenticación exitosa', url: '/superAdmin' });

            }else if(resultadoconsulta.rol === 'admin'){
                req.session.userID = resultadoconsulta._id;
                req.session.rol = resultadoconsulta.rol;
                res.status(200).json({ ok:true , mensaje: 'Autenticación exitosa', url: '/admin' });
            }else if(resultadoconsulta.rol === 'recepcionista'){
                req.session.userID = resultadoconsulta._id;
                req.session.rol = resultadoconsulta.rol;
                res.status(200).json({ ok:true , mensaje: 'Autenticación exitosa', url: '/recepcionista' });
            }else {
                req.session.userID = resultadoconsulta._id;
                req.session.rol = resultadoconsulta.rol;
                res.status(200).json({ ok:true , mensaje: 'Autenticación exitosa', url: '/limpiador' });
            }
            
        }
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error en el servidor' });
        console.log(error)  
    }

};

exports.obtenerDatosUsuario = async (req, res) => {
    try {
        const iduser = req.session.userID;
        const usuarioActual = await usuarioModel.findById(iduser);
        if (!usuarioActual) {
            return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
        }
        res.status(200).json({ ok: true, usuario: usuarioActual });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error en el servidor' });
    }
}


exports.cambiarContrasena = async (req, res) => {
    try {
        const iduser = req.session.userID;
        const { nuevaContrasena } = req.body;
        const usuarioActual = await usuarioModel.findById(iduser);
        if (!usuarioActual) {
            return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
        }
        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
        usuarioActual.password = hashedPassword;
        await usuarioActual.save();
        res.status(200).json({ ok: true, mensaje: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error en el servidor' });
    }
};

exports.cerrarSesion = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al destruir sesión:', err);
            return res.status(500).json({ ok: false, mensaje: 'Error al cerrar sesión' });
        }
        res.clearCookie('connect.sid');
        return res.json({ ok: true, mensaje: 'Sesión cerrada' });
    });
};