var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Usuario = require('../models/usuario');

// ===============================================================
// Obtener todos los Usuarios
// ===============================================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nombre email img role google telefono ocupacion interes institucion estado solicitud')
        .skip(desde)
        .limit(50)
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Usuario',
                        errors: err
                    });
                }

                Usuario.estimatedDocumentCount({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        usuarios: usuarios,
                        total: conteo
                    });
                });
            });
});


// ===============================================================
// Obtener Usuario
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Usuario.findById(id, 'nombre email img role google telefono ocupacion interes institucion estado solicitud')
        .exec((err, usuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar Usuario',
                    errors: err
                });
            }

            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El Usuario con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un Usuario con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                usuario: usuario
            });
        });
});

// ===============================================================
// Actualizar Usuario
// ===============================================================
app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaRolUsuario], (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Usuario con el ID ' + id + ' no existe',
                errors: { message: 'No existe un Usuario con ese ID' }
            });
        }

        usuario.nombre = body.nombre
        usuario.email = body.email
        usuario.role = body.role
        usuario.telefono = body.telefono
        usuario.ocupacion = body.ocupacion
        usuario.interes = body.interes
        usuario.institucion = body.institucion
        usuario.estado = body.estado
        usuario.solicitud = body.solicitud

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':D';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});


// ===============================================================
// Crear un nuevo Usuario
// ===============================================================
app.post('/', (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
        google: body.google,
        telefono: body.telefono,
        ocupacion: body.ocupacion,
        interes: body.interes,
        institucion: body.institucion,
        solicitud: body.solicitud
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });
    });
});


// ===============================================================
// Borrar Usuario
// ===============================================================
app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaRol], (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Usuario con ese ID',
                errors: { message: 'No existe un Usuario con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;