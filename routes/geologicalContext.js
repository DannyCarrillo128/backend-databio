var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var GeologicalContext = require('../models/geologicalContext');

// ===============================================================
// Obtener todos los registros de GeologicalContext
// ===============================================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    GeologicalContext.find({})
        .skip(desde)
        .limit(50)
        .exec(
            (err, geologicalContexts) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los registros de GeologicalContext',
                        errors: err
                    });
                }

                GeologicalContext.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        geologicalContexts: geologicalContexts,
                        total: conteo
                    });
                });
            }
        );
});


// ===============================================================
// Obtener un registro de GeologicalContext
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    GeologicalContext.findById(id)
        .exec((err, geologicalContext) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de GeologicalContext',
                    errors: err
                });
            }

            if (!geologicalContext) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de GeologicalContext con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                geologicalContext: geologicalContext
            });
        });
});


// ===============================================================
// Actualizar un registro de GeologicalContext
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    GeologicalContext.findById(id, (err, geologicalContext) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de GeologicalContext',
                errors: err
            });
        }

        if (!geologicalContext) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de GeologicalContext con ese ID' }
            });
        }

        geologicalContext.geologicalContextID = body.geologicalContextID;
        geologicalContext.earliestEonOrLowestEonothem = body.earliestEonOrLowestEonothem;
        geologicalContext.latestEonOrHighestEonothem = body.latestEonOrHighestEonothem;
        geologicalContext.earliestEraOrLowestErathem = body.earliestEraOrLowestErathem;
        geologicalContext.latestEraOrHighestErathem = body.latestEraOrHighestErathem;
        geologicalContext.earliestPeriodOrLowestSystem = body.earliestPeriodOrLowestSystem;
        geologicalContext.latestPeriodOrHighestSystem = body.latestPeriodOrHighestSystem;
        geologicalContext.earliestEpochOrLowestSeries = body.earliestEpochOrLowestSeries;
        geologicalContext.latestEpochOrHighestSeries = body.latestEpochOrHighestSeries;
        geologicalContext.earliestAgeOrLowestStage = body.earliestAgeOrLowestStage;
        geologicalContext.latestAgeOrHighestStage = body.latestAgeOrHighestStage;
        geologicalContext.lowestBiostratigraphicZone = body.lowestBiostratigraphicZone;
        geologicalContext.highestBiostratigraphicZone = body.highestBiostratigraphicZone;
        geologicalContext.lithostratigraphicTerms = body.lithostratigraphicTerms;
        geologicalContext.group = body.group;
        geologicalContext.formation = body.formation;
        geologicalContext.member = body.member;
        geologicalContext.bed = body.bed

        geologicalContext.save((err, geologicalContextGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el registro de GeologicalContext',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                geologicalContext: geologicalContextGuardado
            });
        });
    });
});


// ===============================================================
// Crear un registro de GeologicalContext
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var geologicalContext = new GeologicalContext({
        geologicalContextID: body.geologicalContextID,
        earliestEonOrLowestEonothem: body.earliestEonOrLowestEonothem,
        latestEonOrHighestEonothem: body.latestEonOrHighestEonothem,
        earliestEraOrLowestErathem: body.earliestEraOrLowestErathem,
        latestEraOrHighestErathem: body.latestEraOrHighestErathem,
        earliestPeriodOrLowestSystem: body.earliestPeriodOrLowestSystem,
        latestPeriodOrHighestSystem: body.latestPeriodOrHighestSystem,
        earliestEpochOrLowestSeries: body.earliestEpochOrLowestSeries,
        latestEpochOrHighestSeries: body.latestEpochOrHighestSeries,
        earliestAgeOrLowestStage: body.earliestAgeOrLowestStage,
        latestAgeOrHighestStage: body.latestAgeOrHighestStage,
        lowestBiostratigraphicZone: body.lowestBiostratigraphicZone,
        highestBiostratigraphicZone: body.highestBiostratigraphicZone,
        lithostratigraphicTerms: body.lithostratigraphicTerms,
        group: body.group,
        formation: body.formation,
        member: body.member,
        bed: body.bed
    });

    geologicalContext.save((err, geologicalContextGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en GeologicalContext',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            geologicalContext: geologicalContextGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de GeologicalContext
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    GeologicalContext.findByIdAndRemove(id, (err, geologicalContextBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el registro de GeologicalContext',
                errors: err
            });
        }

        if (!geologicalContextBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de GeologicalContext con ese ID',
                errors: { message: 'No existe un registro de GeologicalContext con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            geologicalContext: geologicalContextBorrado
        });
    });
});


module.exports = app;