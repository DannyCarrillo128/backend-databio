var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Comentario = require('../models/comentario');

// ===============================================================
// Obtener todos los Comentarios
// ===============================================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Comentario.find({})
        .skip(desde)
        .limit(50)
        .populate('autor')
        .exec(
            (err, comentarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Comentarios',
                        errors: err
                    });
                }

                Comentario.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        comentarios: comentarios,
                        total: conteo
                    });
                });
            }
        );
});


// ===============================================================
// Obtener Comentario
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Comentario.findById(id)
        .populate('autor')
        .exec((err, comentario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar Comentario',
                    errors: err
                });
            }

            if (!comentario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El Comentario con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un Comentario con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                comentario: comentario
            });
        });
});


// ===============================================================
// Actualizar Comentario
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Comentario.findById(id, (err, comentario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Comentario',
                errors: err
            });
        }

        if (!comentario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Comentario con el ID ' + id + ' no existe',
                errors: { message: 'No existe un Comentario con ese ID' }
            });
        }

        comentario.texto = body.texto;
        comentario.autor = body.autor;
        comentario.fecha = body.fecha;
        comentario.puntuacion = body.puntuacion;

        comentario.save((err, comentarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Comentario',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                comentario: comentarioGuardado
            });
        });
    });
});


// ===============================================================
// Crear Comentario
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var comentario = new Comentario({
        texto: body.texto,
        autor: body.autor,
        fecha: body.fecha,
        puntuacion: body.puntuacion
    });

    comentario.save((err, comentarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Comentario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            comentario: comentarioGuardado
        });
    });
});


// ===============================================================
// Borrar Comentario
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Comentario.findByIdAndRemove(id, (err, comentarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Comentario',
                errors: err
            });
        }

        if (!comentarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Comentario con ese ID',
                errors: { message: 'No existe un Comentario con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            comentario: comentarioBorrado
        });
    });
});

module.exports = app;