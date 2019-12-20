var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Identification = require('../models/identification');

// ===============================================================
// Obtener todos los registros de Identification
// ===============================================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Identification.find({})
        .skip(desde)
        .limit(50)
        .exec(
            (err, identifications) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los registros de Identification',
                        errors: err
                    });
                }

                Identification.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        identifications: identifications,
                        total: conteo
                    });
                });
            }
        );
});


// ===============================================================
// Obtener un registro de Identification
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Identification.findById(id)
        .exec((err, identification) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de Identification',
                    errors: err
                });
            }

            if (!identification) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de Identification con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                identification: identification
            });
        });
});


// ===============================================================
// Actualizar un registro de Identification
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Identification.findById(id, (err, identification) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de Identification',
                errors: err
            });
        }

        if (!identification) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de Identification con ese ID' }
            });
        }

        identification.identificationID = body.identificationID;
        identification.identificationQualifier = body.identificationQualifier;
        identification.typeStatus = body.typeStatus;
        identification.identifiedBy = body.identifiedBy;
        identification.dateIdentified = body.dateIdentified;
        identification.identificationReferences = body.identificationReferences;
        identification.identificationVerificationStatus = body.identificationVerificationStatus;
        identification.identificationRemarks = body.identificationRemarks;

        identification.save((err, identificationGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Error al actualizar el registro de Identification',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                identification: identificationGuardado
            });
        });
    });
});


// ===============================================================
// Crear un registro de Identification
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var identification = new Identification({
        identificationID: body.identificationID,
        identificationQualifier: body.identificationQualifier,
        typeStatus: body.typeStatus,
        identifiedBy: body.identifiedBy,
        dateIdentified: body.dateIdentified,
        identificationReferences: body.identificationReferences,
        identificationVerificationStatus: body.identificationVerificationStatus,
        identificationRemarks: body.identificationRemarks
    });

    identification.save((err, identificationGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en Identification',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            identification: identificationGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de Identification
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Identification.findByIdAndRemove(id, (err, identificationBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el registro de Identification',
                errors: err
            });
        }

        if (!identificationBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de Identification con ese ID',
                errors: { message: 'No existe un registro de Identification con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            identification: identificationBorrado
        });
    });
});


module.exports = app;