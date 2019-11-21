var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Organism = require('../models/organism');

// ===============================================================
// Obtener todos los registros de Organism
// ===============================================================
app.get('/', (req, res, next) => {
    Organism.find({})
        .exec(
            (err, organisms) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los registros de Organism',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    organisms: organisms
                });
            }
        );
});


// ===============================================================
// Obtener un registro de Organism
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Organism.findById(id)
        .exec((err, organism) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de Organism',
                    errors: err
                });
            }

            if (!organism) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de Organism con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                organism: organism
            });
        });
});


// ===============================================================
// Actualizar un registro de Organism
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Organism.findById(id, (err, organism) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de Organism',
                errors: err
            });
        }

        if (!organism) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de Organism con ese ID' }
            });
        }

        organism.organismID = body.organismID;
        organism.organismName = body.organismName;
        organism.organismScope = body.organismScope;
        organism.associatedOccurrences = body.associatedOccurrences;
        organism.associatedOrganisms = body.associatedOrganisms;
        organism.previousIdentifications = body.previousIdentifications;
        organism.organismRemarks = body.organismRemarks;

        organism.save((err, organismGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el registro de Organism',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                organism: organismGuardado
            });
        });
    });
});


// ===============================================================
// Crear un registro de Organism
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var organism = new Organism({
        organismID: body.organismID,
        organismName: body.organismName,
        organismScope: body.organismScope,
        associatedOccurrences: body.associatedOccurrences,
        associatedOrganisms: body.associatedOrganisms,
        previousIdentifications: body.previousIdentifications,
        organismRemarks: body.organismRemarks
    });

    organism.save((err, organismGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en Organism',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            organism: organismGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de Organism
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Organism.findByIdAndRemove(id, (err, organismBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el registro de Organism',
                errors: err
            });
        }

        if (!organismBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de Organism con ese ID',
                errors: { message: 'No existe un registro de Organism con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            organism: organismBorrado
        });
    });
});

module.exports = app;