var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var locationSchema = new Schema({
    locationID: { type: String, required: false },
    higherGeographyID: { type: String, required: false },
    higherGeography: { type: String, required: false },
    continent: { type: String, required: false },
    waterBody: { type: String, required: false },
    islandGroup: { type: String, required: false },
    island: { type: String, required: false },
    country: { type: String, required: false },
    countryCode: { type: String, required: false },
    stateProvince: { type: String, required: false },
    county: { type: String, required: false },
    municipality: { type: String, required: false },
    locality: { type: String, required: false },
    verbatimLocality: { type: String, required: false },
    minimumElevationInMeters: { type: String, required: false },
    maximumElevationInMeters: { type: String, required: false },
    verbatimElevation: { type: String, required: false },
    minimumDepthInMeters: { type: String, required: false },
    maximumDepthInMeters: { type: String, required: false },
    verbatimDepth: { type: String, required: false },
    minimumDistanceAboveSurfaceInMeters: { type: String, required: false },
    maximumDistanceAboveSurfaceInMeters: { type: String, required: false },
    locationAccordingTo: { type: String, required: false },
    locationRemarks: { type: String, required: false },
    decimalLatitude: { type: String, required: false },
    decimalLongitude: { type: String, required: false },
    geodeticDatum: { type: String, required: false },
    coordinateUncertaintyInMeters: { type: String, required: false },
    coordinatePrecision: { type: String, required: false },
    pointRadiusSpatialFit: { type: String, required: false },
    verbatimCoordinates: { type: String, required: false },
    verbatimLatitude: { type: String, required: false },
    verbatimLongitude: { type: String, required: false },
    verbatimCoordinateSystem: { type: String, required: false },
    verbatimSRS: { type: String, required: false },
    footprintWKT: { type: String, required: false },
    footprintSRS: { type: String, required: false },
    footprintSpatialFit: { type: String, required: false },
    georeferencedBy: { type: String, required: false },
    georeferencedDate: { type: String, required: false },
    georeferenceProtocol: { type: String, required: false },
    georeferenceSources: { type: String, required: false },
    georeferenceVerificationStatus: { type: String, required: false },
    georeferenceRemarks: { type: String, required: false }
});

module.exports = mongoose.model('Location', locationSchema);