var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

// ===============================================================
// Verificar Token
// ===============================================================
exports.verificaToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};


// ===============================================================
// Verificar Rol
// ===============================================================
exports.verificaRol = function(req, res, next) {
    var usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Permiso denegado',
            errors: { message: 'Permiso denegado' }
        });
    }
};


// ===============================================================
// Verificar Rol o Mismo usuario
// ===============================================================
exports.verificaRolUsuario = function(req, res, next) {
    var usuario = req.usuario;
    var id = req.params.id;

    if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Permiso denegado',
            errors: { message: 'Permiso denegado' }
        });
    }
};


// ===============================================================
// Verificar Autenticación
// ===============================================================
exports.verificaAutenticacion = function(req, res, next) {
    var usuario = req.usuario;

    if (!usuario.google) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Permiso denegado',
            errors: { message: 'Permiso denegado' }
        });
    }
};