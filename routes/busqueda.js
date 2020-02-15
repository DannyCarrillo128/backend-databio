var express = require('express');

var app = express();

var Usuario = require('../models/usuario');
var DarwinCore = require('../models/darwinCore');

//=======================================================================
// Búsqueda por Colección
//=======================================================================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {
    var tabla = req.params.tabla;
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {
        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;

        case 'darwinCores':
            promesa = buscarDarwinCores(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: '',
                error: { message: 'Tabla/Colección no válida' }
            });
    }

    promesa.then(data => {
        res.status(200).json({
            ok: true,
            [tabla]: data
        });
    });
});


//=======================================================================
// Búsqueda General
//=======================================================================
app.get('/todo/:busqueda', (req, res, next) => {
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            buscarUsuarios(busqueda, regex),
            buscarDarwinCores(busqueda, regex)
        ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                usuarios: respuestas[0],
                darwinCores: respuestas[1]
            });
        });
});


function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Usuario.find({}, 'nombre email role')
            .or([
                { 'nombre': regex },
                { 'email': regex }
            ])
            .exec((err, usuarios) => {
                if (err) {
                    reject('Error al cargar Usuarios', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}


function buscarDarwinCores(busqueda, regex) {

    return new Promise((resolve, reject) => {
        DarwinCore.find({})
            .or([
                { 'registro': regex },
                // Record-level
                { 'type': regex },
                { 'modified': regex },
                { 'language': regex },
                { 'license': regex },
                { 'rightsHolder': regex },
                { 'accessRights': regex },
                { 'bibliographicCitation': regex },
                { 'references': regex },
                { 'institutionID': regex },
                { 'collectionID': regex },
                { 'datasetID': regex },
                { 'institutionCode': regex },
                { 'collectionCode': regex },
                { 'datasetName': regex },
                { 'ownerInstitutionCode': regex },
                { 'basisOfRecord': regex },
                { 'informationWithheld': regex },
                { 'dataGeneralizations': regex },
                { 'dynamicProperties': regex },
                // Occurrence
                { 'occurrenceID': regex },
                { 'catalogNumber': regex },
                { 'recordNumber': regex },
                { 'recordedBy': regex },
                { 'individualCount': regex },
                { 'organismQuantity': regex },
                { 'organismQuantityType': regex },
                { 'sex': regex },
                { 'lifeStage': regex },
                { 'reproductiveCondition': regex },
                { 'behavior': regex },
                { 'establishmentMeans': regex },
                { 'occurrenceStatus': regex },
                { 'preparations': regex },
                { 'disposition': regex },
                { 'associatedMedia': regex },
                { 'associatedReferences': regex },
                { 'associatedSequences': regex },
                { 'associatedTaxa': regex },
                { 'otherCatalogNumbers': regex },
                { 'occurrenceRemarks': regex },
                // Organism
                { 'organismID': regex },
                { 'organismName': regex },
                { 'organismScope': regex },
                { 'associatedOccurrences': regex },
                { 'associatedOrganisms': regex },
                { 'previousIdentifications': regex },
                { 'organismRemarks': regex },
                // MaterialSample
                { 'materialSampleID': regex },
                // Event
                { 'eventID': regex },
                { 'parentEventID': regex },
                { 'fieldNumber': regex },
                { 'eventDate': regex },
                { 'eventTime': regex },
                { 'startDayOfYear': regex },
                { 'endDayOfYear': regex },
                { 'year': regex },
                { 'month': regex },
                { 'day': regex },
                { 'verbatimEventDate': regex },
                { 'habitat': regex },
                { 'samplingProtocol': regex },
                { 'sampleSizeValue': regex },
                { 'sampleSizeUnit': regex },
                { 'samplingEffort': regex },
                { 'fieldNotes': regex },
                { 'eventRemarks': regex },
                // Location
                { 'locationID': regex },
                { 'higherGeographyID': regex },
                { 'higherGeography': regex },
                { 'continent': regex },
                { 'waterBody': regex },
                { 'islandGroup': regex },
                { 'island': regex },
                { 'country': regex },
                { 'countryCode': regex },
                { 'stateProvince': regex },
                { 'county': regex },
                { 'municipality': regex },
                { 'locality': regex },
                { 'verbatimLocality': regex },
                { 'minimumElevationInMeters': regex },
                { 'maximumElevationInMeters': regex },
                { 'verbatimElevation': regex },
                { 'minimumDepthInMeters': regex },
                { 'maximumDepthInMeters': regex },
                { 'verbatimDepth': regex },
                { 'minimumDistanceAboveSurfaceInMeters': regex },
                { 'maximumDistanceAboveSurfaceInMeters': regex },
                { 'locationAccordingTo': regex },
                { 'locationRemarks': regex },
                { 'decimalLatitude': regex },
                { 'decimalLongitude': regex },
                { 'geodeticDatum': regex },
                { 'coordinateUncertaintyInMeters': regex },
                { 'coordinatePrecision': regex },
                { 'pointRadiusSpatialFit': regex },
                { 'verbatimCoordinates': regex },
                { 'verbatimLatitude': regex },
                { 'verbatimLongitude': regex },
                { 'verbatimCoordinateSystem': regex },
                { 'verbatimSRS': regex },
                { 'footprintWKT': regex },
                { 'footprintSRS': regex },
                { 'footprintSpatialFit': regex },
                { 'georeferencedBy': regex },
                { 'georeferencedDate': regex },
                { 'georeferenceProtocol': regex },
                { 'georeferenceSources': regex },
                { 'georeferenceVerificationStatus': regex },
                { 'georeferenceRemarks': regex },
                // GeologicalContext
                { 'geologicalContextID': regex },
                { 'earliestEonOrLowestEonothem': regex },
                { 'latestEonOrHighestEonothem': regex },
                { 'earliestEraOrLowestErathem': regex },
                { 'latestEraOrHighestErathem': regex },
                { 'earliestPeriodOrLowestSystem': regex },
                { 'latestPeriodOrHighestSystem': regex },
                { 'earliestEpochOrLowestSeries': regex },
                { 'latestEpochOrHighestSeries': regex },
                { 'earliestAgeOrLowestStage': regex },
                { 'latestAgeOrHighestStage': regex },
                { 'lowestBiostratigraphicZone': regex },
                { 'highestBiostratigraphicZone': regex },
                { 'lithostratigraphicTerms': regex },
                { 'group': regex },
                { 'formation': regex },
                { 'member': regex },
                { 'bed': regex },
                // Identification
                { 'identificationID': regex },
                { 'identificationQualifier': regex },
                { 'typeStatus': regex },
                { 'identifiedBy': regex },
                { 'dateIdentified': regex },
                { 'identificationReferences': regex },
                { 'identificationVerificationStatus': regex },
                { 'identificationRemarks': regex },
                // Taxon
                { 'taxonID': regex },
                { 'scientificNameID': regex },
                { 'acceptedNameUsageID': regex },
                { 'parentNameUsageID': regex },
                { 'originalNameUsageIDProperty': regex },
                { 'nameAccordingToID': regex },
                { 'namePublishedInID': regex },
                { 'taxonConceptID': regex },
                { 'scientificName': regex },
                { 'acceptedNameUsage': regex },
                { 'parentNameUsage': regex },
                { 'originalNameUsage': regex },
                { 'nameAccordingTo': regex },
                { 'namePublishedIn': regex },
                { 'namePublishedInYear': regex },
                { 'higherClassification': regex },
                { 'kingdom': regex },
                { 'phylum': regex },
                { 'class': regex },
                { 'order': regex },
                { 'family': regex },
                { 'genus': regex },
                { 'subgenus': regex },
                { 'specificEpithet': regex },
                { 'infraspecificEpithet': regex },
                { 'taxonRank': regex },
                { 'verbatimTaxonRank': regex },
                { 'scientificNameAuthorship': regex },
                { 'vernacularName': regex },
                { 'nomenclaturalCode': regex },
                { 'taxonomicStatus': regex },
                { 'nomenclaturalStatus': regex },
                { 'taxonRemarks': regex },
                // MeasurementOrFact
                { 'measurementID': regex },
                { 'measurementType': regex },
                { 'measurementValue': regex },
                { 'measurementAccuracy': regex },
                { 'measurementUnit': regex },
                { 'measurementDeterminedBy': regex },
                { 'measurementDeterminedDate': regex },
                { 'measurementMethod': regex },
                { 'measurementRemarks': regex },
                // ResourceRelationship
                { 'resourceRelationshipID': regex },
                { 'resourceID': regex },
                { 'relatedResourceID': regex },
                { 'relationshipOfResource': regex },
                { 'relationshipAccordingTo': regex },
                { 'relationshipEstablishedDate': regex },
                { 'relationshipRemarks': regex }
            ])
            .exec((err, darwinCores) => {
                if (err) {
                    reject('Error al cargar los registros de DarwinCore', err);
                } else {
                    resolve(darwinCores);
                }
            });
    });
}

module.exports = app;