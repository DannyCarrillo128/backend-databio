var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Fotografia = require('../models/fotografia');

// ===============================================================
// Obtener todas las Fotografías
// ===============================================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Fotografia.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, fotografias) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Fotografía',
                        errors: err
                    });
                }

                Fotografia.estimatedDocumentCount({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        fotografias: fotografias,
                        total: conteo
                    });
                });
            });
});


// ===============================================================
// Obtener una Fotografía
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Fotografia.findById(id)
        .exec((err, fotografia) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar Fotografía',
                    errors: err
                });
            }

            if (!fotografia) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La Fotografia con el ID ' + id + ' no existe',
                    errors: { message: 'No existe una Fotografía con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                fotografia: fotografia
            });
        });
});


// ===============================================================
// Actualizar Fotografía
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Fotografia.findById(id, (err, fotografia) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Fotografía',
                errors: err
            });
        }

        if (!fotografia) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La Fotografía con el ID ' + id + ' no existe',
                errors: { message: 'No existe una Fotografía con ese ID' }
            });
        }

        fotografia.img = body.img;
        fotografia.camara = body.camara;
        fotografia.distanciaFocal = body.distanciaFocal;
        fotografia.tiempoDeExposicion = body.tiempoDeExposicion;
        fotografia.iso = body.iso;
        fotografia.flash = body.flash;
        fotografia.comentarios = body.comentarios;

        fotografia.save((err, fotografiaGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar la Fotografía',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                fotografia: fotografiaGuardada
            });
        });
    });
});


// ===============================================================
// Crear una nueva Fotografía
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var fotografia = new Fotografia({
        img: body.img,
        camara: body.camara,
        distanciaFocal: body.distanciaFocal,
        tiempoDeExposicion: body.tiempoDeExposicion,
        iso: body.iso,
        flash: body.flash,
        comentarios: body.comentarios
    });

    fotografia.save((err, fotografiaGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear una nueva Fotografía',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            fotografia: fotografiaGuardada
        });
    });
});


// ===============================================================
// Borrar Fotografía
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Fotografia.findByIdAndRemove(id, (err, fotografiaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar la Fotografía',
                errors: err
            });
        }

        if (!fotografiaBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una Fotografía con ese ID',
                errors: { message: 'No existe una Fotografía con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            fotografia: fotografiaBorrada
        });
    });
});

module.exports = app;