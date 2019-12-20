var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Location = require('../models/location');

// ===============================================================
// Obtener todos los registros de Location
// ===============================================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Location.find({})
        .skip(desde)
        .limit(50)
        .exec(
            (err, locations) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los registros de Location',
                        errors: err
                    });
                }

                Location.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        locations: locations,
                        total: conteo
                    });
                });
            }
        );
});


// ===============================================================
// Obtener un registro de Location
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Location.findById(id)
        .exec((err, location) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de Location',
                    errors: err
                });
            }

            if (!location) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de Location con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                location: location
            });
        });
});


// ===============================================================
// Actualizar un registro de Location
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Location.findById(id, (err, location) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de Location',
                errors: err
            });
        }

        if (!location) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de Location con ese ID' }
            });
        }

        location.locationID = body.locationID;
        location.higherGeographyID = body.higherGeographyID;
        location.higherGeography = body.higherGeography;
        location.continent = body.continent;
        location.waterBody = body.waterBody;
        location.islandGroup = body.islandGroup;
        location.island = body.island;
        location.country = body.country;
        location.countryCode = body.countryCode;
        location.stateProvince = body.stateProvince;
        location.county = body.county;
        location.municipality = body.municipality;
        location.locality = body.locality;
        location.verbatimLocality = body.verbatimLocality;
        location.minimumElevationInMeters = body.minimumElevationInMeters;
        location.maximumElevationInMeters = body.maximumElevationInMeters;
        location.verbatimElevation = body.verbatimElevation;
        location.minimumDepthInMeters = body.minimumDepthInMeters;
        location.maximumDepthInMeters = body.maximumDepthInMeters;
        location.verbatimDepth = body.verbatimDepth;
        location.minimumDistanceAboveSurfaceInMeters = body.minimumDistanceAboveSurfaceInMeters;
        location.maximumDistanceAboveSurfaceInMeters = body.maximumDistanceAboveSurfaceInMeters;
        location.locationAccordingTo = body.locationAccordingTo;
        location.locationRemarks = body.locationRemarks;
        location.decimalLatitude = body.decimalLatitude;
        location.decimalLongitude = body.decimalLongitude;
        location.geodeticDatum = body.geodeticDatum;
        location.coordinateUncertaintyInMeters = body.coordinateUncertaintyInMeters;
        location.coordinatePrecision = body.coordinatePrecision;
        location.pointRadiusSpatialFit = body.pointRadiusSpatialFit;
        location.verbatimCoordinates = body.verbatimCoordinates;
        location.verbatimLatitude = body.verbatimLatitude;
        location.verbatimLongitude = body.verbatimLongitude;
        location.verbatimCoordinateSystem = body.verbatimCoordinateSystem;
        location.verbatimSRS = body.verbatimSRS;
        location.footprintWKT = body.footprintWKT;
        location.footprintSRS = body.footprintSRS;
        location.footprintSpatialFit = body.footprintSpatialFit;
        location.georeferencedBy = body.georeferencedBy;
        location.georeferencedDate = body.georeferencedDate;
        location.georeferenceProtocol = body.georeferenceProtocol;
        location.georeferenceSources = body.georeferenceSources;
        location.georeferenceVerificationStatus = body.georeferenceVerificationStatus;
        location.georeferenceRemarks = body.georeferenceRemarks;

        location.save((err, locationGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el registro de Location',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                location: locationGuardado
            });
        });
    });
});


// ===============================================================
// Crear un registro de Location
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var location = new Location({
        locationID: body.locationID,
        higherGeographyID: body.higherGeographyID,
        higherGeography: body.higherGeography,
        continent: body.continent,
        waterBody: body.waterBody,
        islandGroup: body.islandGroup,
        island: body.island,
        country: body.country,
        countryCode: body.countryCode,
        stateProvince: body.stateProvince,
        county: body.county,
        municipality: body.municipality,
        locality: body.locality,
        verbatimLocality: body.verbatimLocality,
        minimumElevationInMeters: body.minimumElevationInMeters,
        maximumElevationInMeters: body.maximumElevationInMeters,
        verbatimElevation: body.verbatimElevation,
        minimumDepthInMeters: body.minimumDepthInMeters,
        maximumDepthInMeters: body.maximumDepthInMeters,
        verbatimDepth: body.verbatimDepth,
        minimumDistanceAboveSurfaceInMeters: body.minimumDistanceAboveSurfaceInMeters,
        maximumDistanceAboveSurfaceInMeters: body.maximumDistanceAboveSurfaceInMeters,
        locationAccordingTo: body.locationAccordingTo,
        locationRemarks: body.locationRemarks,
        decimalLatitude: body.decimalLatitude,
        decimalLongitude: body.decimalLongitude,
        geodeticDatum: body.geodeticDatum,
        coordinateUncertaintyInMeters: body.coordinateUncertaintyInMeters,
        coordinatePrecision: body.coordinatePrecision,
        pointRadiusSpatialFit: body.pointRadiusSpatialFit,
        verbatimCoordinates: body.verbatimCoordinates,
        verbatimLatitude: body.verbatimLatitude,
        verbatimLongitude: body.verbatimLongitude,
        verbatimCoordinateSystem: body.verbatimCoordinateSystem,
        verbatimSRS: body.verbatimSRS,
        footprintWKT: body.footprintWKT,
        footprintSRS: body.footprintSRS,
        footprintSpatialFit: body.footprintSpatialFit,
        georeferencedBy: body.georeferencedBy,
        georeferencedDate: body.georeferencedDate,
        georeferenceProtocol: body.georeferenceProtocol,
        georeferenceSources: body.georeferenceSources,
        georeferenceVerificationStatus: body.georeferenceVerificationStatus,
        georeferenceRemarks: body.georeferenceRemarks
    });

    location.save((err, locationGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en Location',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            location: locationGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de Location
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Location.findByIdAndRemove(id, (err, locationBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el registro de Location',
                errors: err
            });
        }

        if (!locationBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de Location con ese ID',
                errors: { message: 'No existe un registro de Location con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            location: locationBorrado
        });
    });
});


module.exports = app;