var express = require('express');

var app = express();

var Usuario = require('../models/usuario');
var RecordLevel = require('../models/recordLevel');
var Occurrence = require('../models/occurrence');
var Organism = require('../models/organism');
var MaterialSample = require('../models/materialSample');
var Event = require('../models/event');
var Location = require('../models/location');
var GeologicalContext = require('../models/geologicalContext');
var Identification = require('../models/identification');
var Taxon = require('../models/taxon');
var MeasurementOrFact = require('../models/measurementOrFact');
var ResourceRelationship = require('../models/resourceRelationship');

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

        case 'recordLevels':
            promesa = buscarRecordLevels(busqueda, regex);
            break;

        case 'occurrences':
            promesa = buscarOccurrences(busqueda, regex);
            break;

        case 'organisms':
            promesa = buscarOrganisms(busqueda, regex);
            break;

        case 'materialSamples':
            promesa = buscarMaterialSamples(busqueda, regex);
            break;

        case 'events':
            promesa = buscarEvents(busqueda, regex);
            break;

        case 'locations':
            promesa = buscarLocations(busqueda, regex);
            break;

        case 'geologicalContexts':
            promesa = buscarGeologicalContexts(busqueda, regex);
            break;

        case 'identifications':
            promesa = buscarIdentifications(busqueda, regex);
            break;

        case 'taxons':
            promesa = buscarTaxons(busqueda, regex);
            break;

        case 'measurementOrFacts':
            promesa = buscarMeasurementOrFacts(busqueda, regex);
            break;

        case 'resourceRelationships':
            promesa = buscarResourceRelationships(busqueda, regex);
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
            buscarRecordLevels(busqueda, regex),
            buscarOccurrences(busqueda, regex),
            buscarOrganisms(busqueda, regex),
            buscarMaterialSamples(busqueda, regex),
            buscarEvents(busqueda, regex),
            buscarLocations(busqueda, regex),
            buscarGeologicalContexts(busqueda, regex),
            buscarIdentifications(busqueda, regex),
            buscarTaxons(busqueda, regex),
            buscarMeasurementOrFacts(busqueda, regex),
            buscarResourceRelationships(busqueda, regex)
        ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                usuarios: respuestas[0],
                recordLevels: respuestas[1],
                occurrences: respuestas[2],
                organisms: respuestas[3],
                materialSamples: respuestas[4],
                events: respuestas[5],
                locations: respuestas[6],
                geologicalContexts: respuestas[7],
                identifications: respuestas[8],
                taxons: respuestas[9],
                measurementOrFacts: respuestas[10],
                resourceRelationships: respuestas[11],
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


function buscarRecordLevels(busqueda, regex) {

    return new Promise((resolve, reject) => {
        RecordLevel.find({})
            .or([
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
                { 'dynamicProperties': regex }
            ])
            .exec((err, recordLevels) => {
                if (err) {
                    reject('Error al cargar los registros de RecordLevel', err);
                } else {
                    resolve(recordLevels);
                }
            });
    });
}


function buscarOccurrences(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Occurrence.find({})
            .or([
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
                { 'occurrenceRemarks': regex }
            ])
            .exec((err, occurrences) => {
                if (err) {
                    reject('Error al cargar los registros de Occurrence', err);
                } else {
                    resolve(occurrences);
                }
            });
    });
}


function buscarOrganisms(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Organism.find({})
            .or([
                { 'organismID': regex },
                { 'organismName': regex },
                { 'organismScope': regex },
                { 'associatedOccurrences': regex },
                { 'associatedOrganisms': regex },
                { 'previousIdentifications': regex },
                { 'organismRemarks': regex }
            ])
            .exec((err, organisms) => {
                if (err) {
                    reject('Error al cargar los registros de Organisms', err);
                } else {
                    resolve(organisms);
                }
            });
    });
}


function buscarMaterialSamples(busqueda, regex) {

    return new Promise((resolve, reject) => {
        MaterialSample.find({ materialSampleID: regex }, (err, materialSamples) => {
            if (err) {
                reject('Error al cargar los registros de MaterialSample', err);
            } else {
                resolve(materialSamples);
            }
        });
    });
}


function buscarEvents(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Event.find({}, 'nombre email role')
            .or([
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
                { 'eventRemarks': regex }
            ])
            .exec((err, events) => {
                if (err) {
                    reject('Error al cargar los registros de Event', err);
                } else {
                    resolve(events);
                }
            });
    });
}


function buscarLocations(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Location.find({})
            .or([
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
                { 'georeferenceRemarks': regex }
            ])
            .exec((err, locations) => {
                if (err) {
                    reject('Error al cargar los registros de Location', err);
                } else {
                    resolve(locations);
                }
            });
    });
}


function buscarGeologicalContexts(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Usuario.find({})
            .or([
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
                { 'bed': regex }
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


function buscarIdentifications(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Identification.find({})
            .or([
                { 'identificationID': regex },
                { 'identificationQualifier': regex },
                { 'typeStatus': regex },
                { 'identifiedBy': regex },
                { 'dateIdentified': regex },
                { 'identificationReferences': regex },
                { 'identificationVerificationStatus': regex },
                { 'identificationRemarks': regex }
            ])
            .exec((err, identifications) => {
                if (err) {
                    reject('Error al cargar los registros de Identification', err);
                } else {
                    resolve(identifications);
                }
            });
    });
}


function buscarTaxons(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Taxon.find({})
            .or([
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
                { 'taxonRemarks': regex }
            ])
            .exec((err, taxons) => {
                if (err) {
                    reject('Error al cargar los registros de Taxon', err);
                } else {
                    resolve(taxons);
                }
            });
    });
}


function buscarMeasurementOrFacts(busqueda, regex) {

    return new Promise((resolve, reject) => {
        MeasurementOrFact.find({})
            .or([
                { 'measurementID': regex },
                { 'measurementType': regex },
                { 'measurementValue': regex },
                { 'measurementAccuracy': regex },
                { 'measurementUnit': regex },
                { 'measurementDeterminedBy': regex },
                { 'measurementDeterminedDate': regex },
                { 'measurementMethod': regex },
                { 'measurementRemarks': regex }
            ])
            .exec((err, measurementOrFacts) => {
                if (err) {
                    reject('Error al cargar los registros de MeasurementOrFact', err);
                } else {
                    resolve(measurementOrFacts);
                }
            });
    });
}


function buscarResourceRelationships(busqueda, regex) {
    return new Promise((resolve, reject) => {

        ResourceRelationship.find({})
            .or([
                { 'resourceRelationshipID': regex },
                { 'resourceID': regex },
                { 'relatedResourceID': regex },
                { 'relationshipOfResource': regex },
                { 'relationshipAccordingTo': regex },
                { 'relationshipEstablishedDate': regex },
                { 'relationshipRemarks': regex }
            ])
            .exec((err, resourceRelationships) => {
                if (err) {
                    reject('Error al cargar los registros de ResourceRelationship', err);
                } else {
                    resolve(resourceRelationships);
                }
            });
    });
}

module.exports = app;