var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Metadato = require('../models/metadato');

// ===============================================================
// Obtener todos los Metadatos
// ===============================================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Metadato.find({})
        .skip(desde)
        .limit(50)
        .exec(
            (err, metadatos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Metadatos',
                        errors: err
                    });
                }

                Metadato.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        metadatos: metadatos,
                        total: conteo
                    });
                });
            }
        );
});


// ===============================================================
// Obtener Metadato
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Metadato.findById(id)
        .exec((err, metadato) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar Metadato',
                    errors: err
                });
            }

            if (!metadato) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El Metadato con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un Metadato con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                metadato: metadato
            });
        });
});


// ===============================================================
// Actualizar Metadato
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Metadato.findById(id, (err, metadato) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Metadato',
                errors: err
            });
        }

        if (!metadato) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Metadato con el ID ' + id + ' no existe',
                errors: { message: 'No existe un Metadato con esse ID' }
            });
        }

        metadato.campo = body.campo;
        metadato.nombre = body.nombre;
        metadato.visible = body.visible;

        metadato.save((err, metadatoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Metadato',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                metadato: metadatoGuardado
            });
        });
    });
});


// ===============================================================
// Crear Metadato
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var metadato = new Metadato({
        campo: body.campo,
        nombre: body.nombre,
        visible: body.visible
    });

    metadato.save((err, metadatoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Metadato',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            metadato: metadatoGuardado
        });
    });
});


// ===============================================================
// Borrar Metadato
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.param.id;

    Metadato.findByIdAndRemove(id, (err, metadatoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Metadato',
                errors: err
            });
        }

        if (!metadatoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Metadato con ese ID',
                errors: { message: 'No existe un Metadato con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            metadato: metadatoBorrado
        });
    });
});

module.exports = app;