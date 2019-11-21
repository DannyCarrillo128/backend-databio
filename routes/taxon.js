var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Taxon = require('../models/taxon');

// ===============================================================
// Obtener todos los registros de Taxon
// ===============================================================
app.get('/', (req, res, next) => {
    Taxon.find({})
        .exec((err, taxons) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando los registros de Taxon',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                taxons: taxons
            });
        });
});


// ===============================================================
// Obtener un registro de Taxon
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Taxon.findById(id)
        .exec((err, taxon) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de Taxon',
                    errors: err
                });
            }

            if (!taxon) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de Taxon con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                taxon: taxon
            });
        });
});


// ===============================================================
// Actualizar un registro de Taxon
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Taxon.findById(id, (err, taxon) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de Taxon',
                errors: err
            });
        }

        if (!taxon) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de Taxon con ese ID' }
            });
        }

        taxon.taxonID = body.taxonID;
        taxon.scientificNameID = body.scientificNameID;
        taxon.acceptedNameUsageID = body.acceptedNameUsageID;
        taxon.parentNameUsageID = body.parentNameUsageID;
        taxon.originalNameUsageIDProperty = body.originalNameUsageIDProperty;
        taxon.nameAccordingToID = body.nameAccordingToID;
        taxon.namePublishedInID = body.namePublishedInID;
        taxon.taxonConceptID = body.taxonConceptID;
        taxon.scientificName = body.scientificName;
        taxon.acceptedNameUsage = body.acceptedNameUsage;
        taxon.parentNameUsage = body.parentNameUsage;
        taxon.originalNameUsage = body.originalNameUsage;
        taxon.nameAccordingTo = body.nameAccordingTo;
        taxon.namePublishedIn = body.namePublishedIn;
        taxon.namePublishedInYear = body.namePublishedInYear;
        taxon.higherClassification = body.higherClassification;
        taxon.kingdom = body.kingdom;
        taxon.phylum = body.phylum;
        taxon.class = body.class;
        taxon.order = body.order;
        taxon.family = body.family;
        taxon.genus = body.genus;
        taxon.subgenus = body.subgenus;
        taxon.specificEpithet = body.specificEpithet;
        taxon.infraspecificEpithet = body.infraspecificEpithet;
        taxon.taxonRank = body.taxonRank;
        taxon.verbatimTaxonRank = body.verbatimTaxonRank;
        taxon.scientificNameAuthorship = body.scientificNameAuthorship;
        taxon.vernacularName = body.vernacularName;
        taxon.nomenclaturalCode = body.nomenclaturalCode;
        taxon.taxonomicStatus = body.taxonomicStatus;
        taxon.nomenclaturalStatus = body.nomenclaturalStatus;
        taxon.taxonRemarks = body.taxonRemarks;

        taxon.save((err, taxonGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: '',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                taxon: taxonGuardado
            });
        });
    });
});


// ===============================================================
// Crear un registro de Taxon
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var taxon = new Taxon({
        taxonID: body.taxonID,
        scientificNameID: body.scientificNameID,
        acceptedNameUsageID: body.acceptedNameUsageID,
        parentNameUsageID: body.parentNameUsageID,
        originalNameUsageIDProperty: body.originalNameUsageIDProperty,
        nameAccordingToID: body.nameAccordingToID,
        namePublishedInID: body.namePublishedInID,
        taxonConceptID: body.taxonConceptID,
        scientificName: body.scientificName,
        acceptedNameUsage: body.acceptedNameUsage,
        parentNameUsage: body.parentNameUsage,
        originalNameUsage: body.originalNameUsage,
        nameAccordingTo: body.nameAccordingTo,
        namePublishedIn: body.namePublishedIn,
        namePublishedInYear: body.namePublishedInYear,
        higherClassification: body.higherClassification,
        kingdom: body.kingdom,
        phylum: body.phylum,
        class: body.class,
        order: body.order,
        family: body.family,
        genus: body.genus,
        subgenus: body.subgenus,
        specificEpithet: body.specificEpithet,
        infraspecificEpithet: body.infraspecificEpithet,
        taxonRank: body.taxonRank,
        verbatimTaxonRank: body.verbatimTaxonRank,
        scientificNameAuthorship: body.scientificNameAuthorship,
        vernacularName: body.vernacularName,
        nomenclaturalCode: body.nomenclaturalCode,
        taxonomicStatus: body.taxonomicStatus,
        nomenclaturalStatus: body.nomenclaturalStatus,
        taxonRemarks: body.taxonRemarks
    });

    taxon.save((err, taxonGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en Taxon',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            taxon: taxonGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de Taxon
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Taxon.findByIdAndRemove(id, (err, taxonBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: '',
                errors: err
            });
        }

        if (!taxonBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de Taxon con ese ID',
                errors: { message: 'No existe un registro de Taxon con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            taxon: taxonBorrado
        });
    });
});


module.exports = app;