var express = require('express');
var mongoose = require('mongoose');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Puntuacion = require('../models/puntuacion');

// ===============================================================
// Obtener Puntuación
// ===============================================================
app.get('/:comentario/:usuario', (req, res) => {
    var comentario = req.params.comentario;
    var usuario = req.params.usuario;

    Puntuacion.find({ comentario: comentario, calificador: usuario }, (err, puntuacion) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar registro',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            puntuacion: puntuacion[0]
        });
    });
});


// ===============================================================
// Obtener el Promedio de un Comentario
// ===============================================================
app.get('/:comentario', (req, res) => {
    var comentario = req.params.comentario;

    Puntuacion.aggregate([
        { $match: { comentario: mongoose.Types.ObjectId(comentario) } },
        { $group: { _id: "$comentario", promedio: { $avg: "$calificacion" } } }
    ], (err, resultado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar registro',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            promedio: resultado[0].promedio
        });
    });
});


// ===============================================================
// Actualizar Puntuación
// ===============================================================
app.put('/:comentario/:usuario', mdAutenticacion.verificaToken, (req, res) => {
    var comentario = req.params.comentario;
    var usuario = req.params.usuario;
    var body = req.body;

    Puntuacion.find({ comentario: comentario, calificador: usuario }, (err, puntuacion) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar registro',
                errors: err
            });
        }

        if (!puntuacion[0]) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Puntuación con ese ID',
                errors: { message: 'No existe un Puntuación con ese ID' }
            });
        }

        puntuacion[0].calificacion = body.calificacion;

        puntuacion[0].save((err, puntuacionGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Puntuación',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                puntuacion: puntuacionGuardada
            });
        });
    });
});


// ===============================================================
// Crear Puntuación
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var puntuacion = new Puntuacion({
        comentario: body.comentario,
        calificacion: body.calificacion,
        calificador: body.calificador
    });

    puntuacion.save((err, puntuacionGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Puntuación',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            puntuacion: puntuacionGuardada
        });
    });
});


// ===============================================================
// Borrar Puntuación
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Puntuacion.findByIdAndRemove(id, (err, puntuacionBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Puntuación',
                errors: err
            });
        }

        if (!puntuacionBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Puntuación con ese ID',
                errors: { message: 'No existe un Puntuación con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            puntuacion: puntuacionBorrada
        });
    });
});

module.exports = app;