var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var ResourceRelationship = require('../models/resourceRelationship');

// ===============================================================
// Obtener todos los registros de ResourceRelationship
// ===============================================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    ResourceRelationship.find({})
        .skip(desde)
        .limit(50)
        .exec(
            (err, resourceRelationships) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los registros de ResourceRelationship',
                        errors: err
                    });
                }

                ResourceRelationship.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        resourceRelationships: resourceRelationships,
                        total: conteo
                    });
                });
            }
        );
});


// ===============================================================
// Obtener un registro de ResourceRelationship
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    ResourceRelationship.findById(id)
        .exec((err, resourceRelationship) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de ResourceRelationship',
                    errors: err
                });
            }

            if (!resourceRelationship) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de ResourceRelationship con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                resourceRelationship: resourceRelationship
            });
        });
});


// ===============================================================
// Actualizar un registro de ResourceRelationship
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    ResourceRelationship.findById(id, (err, resourceRelationship) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de ResourceRelationship',
                errors: err
            });
        }

        if (!resourceRelationship) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de ResourceRelationship con ese ID' }
            });
        }

        resourceRelationship.resourceRelationshipID = body.resourceRelationshipID;
        resourceRelationship.resourceID = body.resourceID;
        resourceRelationship.relatedResourceID = body.relatedResourceID;
        resourceRelationship.relationshipOfResource = body.relationshipOfResource;
        resourceRelationship.relationshipAccordingTo = body.relationshipAccordingTo;
        resourceRelationship.relationshipEstablishedDate = body.relationshipEstablishedDate;
        resourceRelationship.relationshipRemarks = body.relationshipRemarks;

        resourceRelationship.save((err, resourceRelationshipGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el registro de ResourceRelationship',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                resourceRelationship: resourceRelationshipGuardado
            });
        });
    });
});


// ===============================================================
// Crear un registro de ResourceRelationship
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var resourceRelationship = new ResourceRelationship({
        resourceRelationshipID: body.resourceRelationshipID,
        resourceID: body.resourceID,
        relatedResourceID: body.relatedResourceID,
        relationshipOfResource: body.relationshipOfResource,
        relationshipAccordingTo: body.relationshipAccordingTo,
        relationshipEstablishedDate: body.relationshipEstablishedDate,
        relationshipRemarks: body.relationshipRemarks
    });

    resourceRelationship.save((err, resourceRelationshipGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en ResourceRelationship',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            resourceRelationship: resourceRelationshipGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de ResourceRelationship
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    ResourceRelationship.findByIdAndRemove(id, (err, resourceRelationshipBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el registro de ResourceRelationship',
                errors: err
            });
        }

        if (!resourceRelationshipBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de ResourceRelationship con ese ID',
                errors: { message: 'No existe un registro de ResourceRelationship con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            resourceRelationship: resourceRelationshipBorrado
        });
    });
});


module.exports = app;