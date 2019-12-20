var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Occurrence = require('../models/occurrence');

// ===============================================================
// Obtener todos los registros de Occurrence
// ===============================================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Occurrence.find({})
        .skip(desde)
        .limit(50)
        .exec(
            (err, occurrences) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los registros de Occurrence',
                        errors: err
                    });
                }

                Occurrence.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        occurrences: occurrences,
                        total: conteo
                    });
                });
            }
        );
});


// ===============================================================
// Obtener un registro de Occurrence
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Occurrence.findById(id)
        .exec((err, occurrence) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de Occurrence',
                    errors: err
                });
            }

            if (!occurrence) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de Occurrence con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                occurrence: occurrence
            });
        });
});


// ===============================================================
// Actualizar un registro de Occurrence
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Occurrence.findById(id, (err, occurrence) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de Occurrence',
                errors: err
            });
        }

        if (!occurrence) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de Occurrence con ese ID' }
            });
        }

        occurrence.occurrenceID = body.occurrenceID;
        occurrence.catalogNumber = body.catalogNumber;
        occurrence.recordNumber = body.recordNumber;
        occurrence.recordedBy = body.recordedBy;
        occurrence.individualCount = body.individualCount;
        occurrence.organismQuantity = body.organismQuantity;
        occurrence.organismQuantityType = body.organismQuantityType;
        occurrence.sex = body.sex;
        occurrence.lifeStage = body.lifeStage;
        occurrence.reproductiveCondition = body.reproductiveCondition;
        occurrence.behavior = body.behavior;
        occurrence.establishmentMeans = body.establishmentMeans;
        occurrence.occurrenceStatus = body.occurrenceStatus;
        occurrence.preparations = body.preparations;
        occurrence.disposition = body.disposition;
        occurrence.associatedMedia = body.associatedMedia;
        occurrence.associatedReferences = body.associatedReferences;
        occurrence.associatedSequences = body.associatedSequences;
        occurrence.associatedTaxa = body.associatedTaxa;
        occurrence.otherCatalogNumbers = body.otherCatalogNumbers;
        occurrence.occurrenceRemarks = body.occurrenceRemarks;

        occurrence.save((err, occurrenceGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el registro de Occurrence',
                    errors: err
                });
            }
        });

        res.status(200).json({
            ok: true,
            occurrence: occurrenceGuardado
        });
    });
});


// ===============================================================
// Crear un registro de Occurrence
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var occurrence = new Occurrence({
        occurrenceID: body.occurrenceID,
        catalogNumber: body.catalogNumber,
        recordNumber: body.recordNumber,
        recordedBy: body.recordedBy,
        individualCount: body.individualCount,
        organismQuantity: body.organismQuantity,
        organismQuantityType: body.organismQuantityType,
        sex: body.sex,
        lifeStage: body.lifeStage,
        reproductiveCondition: body.reproductiveCondition,
        behavior: body.behavior,
        establishmentMeans: body.establishmentMeans,
        occurrenceStatus: body.occurrenceStatus,
        preparations: body.preparations,
        disposition: body.disposition,
        associatedMedia: body.associatedMedia,
        associatedReferences: body.associatedReferences,
        associatedSequences: body.associatedSequences,
        associatedTaxa: body.associatedTaxa,
        otherCatalogNumbers: body.otherCatalogNumbers,
        occurrenceRemarks: body.occurrenceRemarks
    });

    occurrence.save((err, occurrenceGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en Occurrence',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            occurrence: occurrenceGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de Occurrence
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Occurrence.findByIdAndRemove(id, (err, occurrenceBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el registro de Occurrence',
                errors: err
            });
        }

        if (!occurrenceBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de Occurrence con ese ID',
                errors: { message: 'No existe un registro de Occurrence con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            occurrence: occurrenceBorrado
        });
    });
});


module.exports = app;