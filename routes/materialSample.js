var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var MaterialSample = require('../models/materialSample');

// ===============================================================
// Obtener todos los registros de MaterialSample
// ===============================================================
app.get('/', (req, res, next) => {
    MaterialSample.find({})
        .exec((err, materialSamples) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando los registros de MaterialSample',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                materialSamples: materialSamples
            });
        });
});


// ===============================================================
// Obtener un registro de MaterialSample
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    MaterialSample.findById(id)
        .exec((err, materialSample) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de MaterialSample',
                    errors: err
                });
            }

            if (!materialSample) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de MaterialSample con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                materialSample: materialSample
            });
        });
});


// ===============================================================
// Actualizar un registro de MaterialSample
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    MaterialSample.findById(id, (err, materialSample) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de MaterialSample',
                errors: err
            });
        }

        if (!materialSample) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de MaterialSample con ese ID' }
            });
        }

        materialSample.materialSampleID = body.materialSampleID;

        materialSample.save((err, materialSampleGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el registro de MaterialSample',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                materialSample: materialSampleGuardado
            });
        });
    });
});


// ===============================================================
// Crear un registro de MaterialSample
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var materialSample = new MaterialSample({
        materialSampleID: body.materialSampleID
    });

    materialSample.save((err, materialSampleGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en MaterialSample',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            materialSample: materialSampleGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de MaterialSample
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    MaterialSample.findByIdAndRemove(id, (err, materialSampleBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el registro de MaterialSample',
                errors: err
            });
        }

        if (!materialSampleBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de MaterialSample con ese ID',
                errors: { message: 'No existe un registro de MaterialSample con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            materialSample: materialSampleBorrado
        });
    });
});


module.exports = app;