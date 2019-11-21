var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var RecordLevel = require('../models/recordLevel');

// ===============================================================
// Obtener todos los registros de Record-Level
// ===============================================================
app.get('/', (req, res, next) => {
    RecordLevel.find({})
        .exec(
            (err, recordLevels) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los registros de Record-Level',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    recordLevels: recordLevels
                });
            }
        );
});


// ===============================================================
// Obtener un registro de Record-Level
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    RecordLevel.findById(id)
        .exec((err, recordLevel) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de Record-Level',
                    errors: err
                });
            }

            if (!recordLevel) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de Record-Level con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                recordLevel: recordLevel
            });
        });
});


// ===============================================================
// Actualizar un registro de Record-Level
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    RecordLevel.findById(id, (err, recordLevel) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de Record-Level',
                errors: err
            });
        }

        if (!recordLevel) {
            return res.status(500).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de Record-Level con ese ID' }
            });
        }

        recordLevel.type = body.type;
        recordLevel.modified = body.modified;
        recordLevel.language = body.language;
        recordLevel.license = body.license;
        recordLevel.rightsHolder = body.rightsHolder;
        recordLevel.accessRights = body.accessRights;
        recordLevel.bibliographicCitation = body.bibliographicCitation;
        recordLevel.references = body.references;
        recordLevel.institutionID = body.institutionID;
        recordLevel.collectionID = body.collectionID;
        recordLevel.datasetID = body.datasetID;
        recordLevel.institutionCode = body.institutionCode;
        recordLevel.collectionCode = body.collectionCode;
        recordLevel.datasetName = body.datasetName;
        recordLevel.ownerInstitutionCode = body.ownerInstitutionCode;
        recordLevel.basisOfRecord = body.basisOfRecord;
        recordLevel.informationWithheld = body.informationWithheld;
        recordLevel.dataGeneralizations = body.dataGeneralizations;
        recordLevel.dynamicProperties = body.dynamicProperties;

        recordLevel.save((err, recordLevelGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el registro de Record-Level',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                recordLevel: recordLevelGuardado
            });
        });
    })
});


// ===============================================================
// Crear un registro de Record-Level
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var recordLevel = new RecordLevel({
        type: body.type,
        modified: body.modified,
        language: body.language,
        license: body.license,
        rightsHolder: body.rightsHolder,
        accessRights: body.accessRights,
        bibliographicCitation: body.bibliographicCitation,
        references: body.references,
        institutionID: body.institutionID,
        collectionID: body.collectionID,
        datasetID: body.datasetID,
        institutionCode: body.institutionCode,
        collectionCode: body.collectionCode,
        datasetName: body.datasetName,
        ownerInstitutionCode: body.ownerInstitutionCode,
        basisOfRecord: body.basisOfRecord,
        informationWithheld: body.informationWithheld,
        dataGeneralizations: body.dataGeneralizations,
        dynamicProperties: body.dynamicProperties
    });

    recordLevel.save((err, recordLevelGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en Record-Level',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            recordLevel: recordLevelGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de Record-Level
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    RecordLevel.findByIdAndRemove(id, (err, recordLevelBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el registro de Record-Level',
                errors: err
            });
        }

        if (!recordLevelBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de Record-Level con ese ID',
                errors: { message: 'No existe un registro de Record-Level con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            recordLevel: recordLevelBorrado
        });
    });
});

module.exports = app;