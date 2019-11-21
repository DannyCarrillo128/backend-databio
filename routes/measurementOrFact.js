var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var MeasurementOrFact = require('../models/measurementOrFact');

// ===============================================================
// Obtener todos los registros de MeasurementOrFact
// ===============================================================
app.get('/', (req, res, next) => {
    MeasurementOrFact.find({})
        .exec((err, measurementOrFacts) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando los registros de MeasurementOrFacts',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                measurementOrFacts: measurementOrFacts
            });
        });
});


// ===============================================================
// Obtener un registro de MeasurementOrFact
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    MeasurementOrFact.findById(id)
        .exec((err, measurementOrFact) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de MeasurementOrFact',
                    errors: err
                });
            }

            if (!measurementOrFact) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de MeasurementOrFact con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                measurementOrFact: measurementOrFact
            });
        });
});


// ===============================================================
// Actualizar un registro de MeasurementOrFact
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    MeasurementOrFact.findById(id, (err, measurementOrFact) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de MeasurementOrFact',
                errors: err
            });
        }

        if (!measurementOrFact) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de MeasurementOrFact con ese ID' }
            });
        }

        measurementOrFact.measurementID = body.measurementID;
        measurementOrFact.measurementType = body.measurementType;
        measurementOrFact.measurementValue = body.measurementValue;
        measurementOrFact.measurementAccuracy = body.measurementAccuracy;
        measurementOrFact.measurementUnit = body.measurementUnit;
        measurementOrFact.measurementDeterminedBy = body.measurementDeterminedBy;
        measurementOrFact.measurementDeterminedDate = body.measurementDeterminedDate;
        measurementOrFact.measurementMethod = body.measurementMethod;
        measurementOrFact.measurementRemarks = body.measurementRemarks;

        measurementOrFact.save((err, measurementOrFactGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el registro de MeasurementOrFact',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                measurementOrFact: measurementOrFactGuardado
            });
        });
    });
});


// ===============================================================
// Crear un registro de MeasurementOrFact
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var measurementOrFact = new MeasurementOrFact({
        measurementID: body.measurementID,
        measurementType: body.measurementType,
        measurementValue: body.measurementValue,
        measurementAccuracy: body.measurementAccuracy,
        measurementUnit: body.measurementUnit,
        measurementDeterminedBy: body.measurementDeterminedBy,
        measurementDeterminedDate: body.measurementDeterminedDate,
        measurementMethod: body.measurementMethod,
        measurementRemarks: body.measurementRemarks
    });

    measurementOrFact.save((err, measurementOrFactGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en MeasurementOrFact',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            measurementOrFact: measurementOrFactGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de MeasurementOrFact
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    MeasurementOrFact.findByIdAndRemove(id, (err, measurementOrFactBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el registro de MeasurementOrFact',
                errors: err
            });
        }

        if (!measurementOrFactBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de MeasurementOrFact con ese ID',
                errors: { message: 'No existe un registro de MeasurementOrFact con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            measurementOrFact: measurementOrFactBorrado
        });
    });
});


module.exports = app;