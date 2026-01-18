
exports.verificarSesion = (req, res, next) => {
    if (req.session && req.session.userID) {
        next();
    }else {
        res.redirect('/');
    }
};


exports.verificarRol = (roleEsperado) => {
    return (req, res, next) => {
        if (req.session.rol === roleEsperado) {
            return next();
        } else {
            // Lo redirigimos a SU panel correcto 
            const rol = req.session.rol;
            let destino = '/';
            if (rol === 'admin') {
                destino = '/admin';
            } else if (rol === 'recepcionista') {
                destino = '/recepcionista';
            } else if (rol === 'limpiador') {
                destino = '/limpiador';
            }
            return res.redirect(destino);
        }
    };
};


exports.redireccionarSiLogueado = (req, res, next) => {
    if (req.session && req.session.userID) {
        // Si ya tiene sesión, lo mandamos a su panel según el rol
        if (req.session.rol === 'admin') {
            return res.redirect('/admin');
        } else if (req.session.rol === 'recepcionista') {
            return res.redirect('/recepcionista');
        }
        else if (req.session.rol === 'limpiador') {
            return res.redirect('/limpiador');
        }
    }
    // Si no está logueado, lo dejamos ver la página (login)
    next();
};

//Verificar Sesion y Rol para el Borrado de reservas
exports.verificarSesionYRolParaBorrado = (req, res, next) => {
    if (!req.session && !req.session.userID) {
        return res.status(401).json({ mensaje: 'No autorizado. Inicie sesión.' });
    }
    if(!['admin', 'recepcionista'].includes(req.session.rol)) {
        return res.status(403).json({ mensaje: 'No tiene permisos para eliminar reservas.' });
    }
    next();
}