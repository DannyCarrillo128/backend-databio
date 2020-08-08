var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var fileUpload = require('express-fileupload');
var fs = require("fs");

var fastcsv = require("fast-csv");
var { format } = require('@fast-csv/format');

var { PythonShell } = require('python-shell');

var DarwinCore = require('../models/darwinCore');

// ===============================================================
// Obtener todos los registros de DarwinCore
// ===============================================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    DarwinCore.find({})
        .skip(desde)
        .limit(50)
        .exec(
            (err, darwinCores) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los registros de DarwinCore',
                        errors: err
                    });
                }

                DarwinCore.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        darwinCores: darwinCores,
                        total: conteo
                    });
                });
            }
        );
});


// ===============================================================
// Obtener un registro de DarwinCore
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    DarwinCore.findById(id)
        .exec((err, darwinCore) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de DarwinCore',
                    errors: err
                });
            }

            if (!darwinCore) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de DarwinCore con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                darwinCore: darwinCore
            });
        });
});


// ===============================================================
// Obtener Anterior
// ===============================================================
app.get('/anterior/:id', (req, res) => {
    var id = req.params.id;

    DarwinCore.findById({ $lt: id })
        .sort({ _id: -1 })
        .limit(1)
        .exec((err, darwinCore) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de DarwinCore',
                    errors: err
                });
            }

            if (!darwinCore) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de DarwinCore con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                darwinCore: darwinCore
            });
        });
});


// ===============================================================
// Obtener Siguiente
// ===============================================================
app.get('/siguiente/:id', (req, res) => {
    var id = req.params.id;

    DarwinCore.findById({ $gt: id })
        .sort({ _id: 1 })
        .limit(1)
        .exec((err, darwinCore) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de DarwinCore',
                    errors: err
                });
            }

            if (!darwinCore) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de DarwinCore con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                darwinCore: darwinCore
            });
        });
});


// ===============================================================
// Actualizar un registro de DarwinCore
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    DarwinCore.findById(id, (err, darwinCore) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de DarwinCore',
                errors: err
            });
        }

        if (!darwinCore) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de DarwinCore con ese ID' }
            });
        }

        darwinCore.registro = body.registro;
        // Record-level
        darwinCore.type = body.type;
        darwinCore.modified = body.modified;
        darwinCore.language = body.language;
        darwinCore.license = body.license;
        darwinCore.rightsHolder = body.rightsHolder;
        darwinCore.accessRights = body.accessRights;
        darwinCore.bibliographicCitation = body.bibliographicCitation;
        darwinCore.references = body.references;
        darwinCore.institutionID = body.institutionID;
        darwinCore.collectionID = body.collectionID;
        darwinCore.datasetID = body.datasetID;
        darwinCore.institutionCode = body.institutionCode;
        darwinCore.collectionCode = body.collectionCode;
        darwinCore.datasetName = body.datasetName;
        darwinCore.ownerInstitutionCode = body.ownerInstitutionCode;
        darwinCore.basisOfRecord = body.basisOfRecord;
        darwinCore.informationWithheld = body.informationWithheld;
        darwinCore.dataGeneralizations = body.dataGeneralizations;
        darwinCore.dynamicProperties = body.dynamicProperties;
        // Occurrence
        darwinCore.occurrenceID = body.occurrenceID;
        darwinCore.catalogNumber = body.catalogNumber;
        darwinCore.recordNumber = body.recordNumber;
        darwinCore.recordedBy = body.recordedBy;
        darwinCore.individualCount = body.individualCount;
        darwinCore.organismQuantity = body.organismQuantity;
        darwinCore.organismQuantityType = body.organismQuantityType;
        darwinCore.sex = body.sex;
        darwinCore.lifeStage = body.lifeStage;
        darwinCore.reproductiveCondition = body.reproductiveCondition;
        darwinCore.behavior = body.behavior;
        darwinCore.establishmentMeans = body.establishmentMeans;
        darwinCore.occurrenceStatus = body.occurrenceStatus;
        darwinCore.preparations = body.preparations;
        darwinCore.disposition = body.disposition;
        darwinCore.associatedMedia = body.associatedMedia;
        darwinCore.associatedReferences = body.associatedReferences;
        darwinCore.associatedSequences = body.associatedSequences;
        darwinCore.associatedTaxa = body.associatedTaxa;
        darwinCore.otherCatalogNumbers = body.otherCatalogNumbers;
        darwinCore.occurrenceRemarks = body.occurrenceRemarks;
        // Organism
        darwinCore.organismID = body.organismID;
        darwinCore.organismName = body.organismName;
        darwinCore.organismScope = body.organismScope;
        darwinCore.associatedOccurrences = body.associatedOccurrences;
        darwinCore.associatedOrganisms = body.associatedOrganisms;
        darwinCore.previousIdentifications = body.previousIdentifications;
        darwinCore.organismRemarks = body.organismRemarks;
        // MaterialSample
        darwinCore.materialSampleID = body.materialSampleID;
        // Event
        darwinCore.eventID = body.eventID;
        darwinCore.parentEventID = body.parentEventID;
        darwinCore.fieldNumber = body.fieldNumber;
        darwinCore.eventDate = body.eventDate;
        darwinCore.eventTime = body.eventTime;
        darwinCore.startDayOfYear = body.startDayOfYear;
        darwinCore.endDayOfYear = body.endDayOfYear;
        darwinCore.year = body.year;
        darwinCore.month = body.month;
        darwinCore.day = body.day;
        darwinCore.verbatimEventDate = body.verbatimEventDate;
        darwinCore.habitat = body.habitat;
        darwinCore.samplingProtocol = body.samplingProtocol;
        darwinCore.sampleSizeValue = body.sampleSizeValue;
        darwinCore.sampleSizeUnit = body.sampleSizeUnit;
        darwinCore.samplingEffort = body.samplingEffort;
        darwinCore.fieldNotes = body.fieldNotes;
        darwinCore.eventRemarks = body.eventRemarks;
        // Location
        darwinCore.locationID = body.locationID;
        darwinCore.higherGeographyID = body.higherGeographyID;
        darwinCore.higherGeography = body.higherGeography;
        darwinCore.continent = body.continent;
        darwinCore.waterBody = body.waterBody;
        darwinCore.islandGroup = body.islandGroup;
        darwinCore.island = body.island;
        darwinCore.country = body.country;
        darwinCore.countryCode = body.countryCode;
        darwinCore.stateProvince = body.stateProvince;
        darwinCore.county = body.county;
        darwinCore.municipality = body.municipality;
        darwinCore.locality = body.locality;
        darwinCore.verbatimLocality = body.verbatimLocality;
        darwinCore.minimumElevationInMeters = body.minimumElevationInMeters;
        darwinCore.maximumElevationInMeters = body.maximumElevationInMeters;
        darwinCore.verbatimElevation = body.verbatimElevation;
        darwinCore.minimumDepthInMeters = body.minimumDepthInMeters;
        darwinCore.maximumDepthInMeters = body.maximumDepthInMeters;
        darwinCore.verbatimDepth = body.verbatimDepth;
        darwinCore.minimumDistanceAboveSurfaceInMeters = body.minimumDistanceAboveSurfaceInMeters;
        darwinCore.maximumDistanceAboveSurfaceInMeters = body.maximumDistanceAboveSurfaceInMeters;
        darwinCore.locationAccordingTo = body.locationAccordingTo;
        darwinCore.locationRemarks = body.locationRemarks;
        darwinCore.decimalLatitude = body.decimalLatitude;
        darwinCore.decimalLongitude = body.decimalLongitude;
        darwinCore.geodeticDatum = body.geodeticDatum;
        darwinCore.coordinateUncertaintyInMeters = body.coordinateUncertaintyInMeters;
        darwinCore.coordinatePrecision = body.coordinatePrecision;
        darwinCore.pointRadiusSpatialFit = body.pointRadiusSpatialFit;
        darwinCore.verbatimCoordinates = body.verbatimCoordinates;
        darwinCore.verbatimLatitude = body.verbatimLatitude;
        darwinCore.verbatimLongitude = body.verbatimLongitude;
        darwinCore.verbatimCoordinateSystem = body.verbatimCoordinateSystem;
        darwinCore.verbatimSRS = body.verbatimSRS;
        darwinCore.footprintWKT = body.footprintWKT;
        darwinCore.footprintSRS = body.footprintSRS;
        darwinCore.footprintSpatialFit = body.footprintSpatialFit;
        darwinCore.georeferencedBy = body.georeferencedBy;
        darwinCore.georeferencedDate = body.georeferencedDate;
        darwinCore.georeferenceProtocol = body.georeferenceProtocol;
        darwinCore.georeferenceSources = body.georeferenceSources;
        darwinCore.georeferenceVerificationStatus = body.georeferenceVerificationStatus;
        darwinCore.georeferenceRemarks = body.georeferenceRemarks;
        // GeologicalContext
        darwinCore.geologicalContextID = body.geologicalContextID;
        darwinCore.earliestEonOrLowestEonothem = body.earliestEonOrLowestEonothem;
        darwinCore.latestEonOrHighestEonothem = body.latestEonOrHighestEonothem;
        darwinCore.earliestEraOrLowestErathem = body.earliestEraOrLowestErathem;
        darwinCore.latestEraOrHighestErathem = body.latestEraOrHighestErathem;
        darwinCore.earliestPeriodOrLowestSystem = body.earliestPeriodOrLowestSystem;
        darwinCore.latestPeriodOrHighestSystem = body.latestPeriodOrHighestSystem;
        darwinCore.earliestEpochOrLowestSeries = body.earliestEpochOrLowestSeries;
        darwinCore.latestEpochOrHighestSeries = body.latestEpochOrHighestSeries;
        darwinCore.earliestAgeOrLowestStage = body.earliestAgeOrLowestStage;
        darwinCore.latestAgeOrHighestStage = body.latestAgeOrHighestStage;
        darwinCore.lowestBiostratigraphicZone = body.lowestBiostratigraphicZone;
        darwinCore.highestBiostratigraphicZone = body.highestBiostratigraphicZone;
        darwinCore.lithostratigraphicTerms = body.lithostratigraphicTerms;
        darwinCore.group = body.group;
        darwinCore.formation = body.formation;
        darwinCore.member = body.member;
        darwinCore.bed = body.bed;
        // Identification
        darwinCore.identificationID = body.identificationID;
        darwinCore.identificationQualifier = body.identificationQualifier;
        darwinCore.typeStatus = body.typeStatus;
        darwinCore.identifiedBy = body.identifiedBy;
        darwinCore.dateIdentified = body.dateIdentified;
        darwinCore.identificationReferences = body.identificationReferences;
        darwinCore.identificationVerificationStatus = body.identificationVerificationStatus;
        darwinCore.identificationRemarks = body.identificationRemarks;
        // Taxon
        darwinCore.taxonID = body.taxonID;
        darwinCore.scientificNameID = body.scientificNameID;
        darwinCore.acceptedNameUsageID = body.acceptedNameUsageID;
        darwinCore.parentNameUsageID = body.parentNameUsageID;
        darwinCore.originalNameUsageID = body.originalNameUsageID;
        darwinCore.nameAccordingToID = body.nameAccordingToID;
        darwinCore.namePublishedInID = body.namePublishedInID;
        darwinCore.taxonConceptID = body.taxonConceptID;
        darwinCore.scientificName = body.scientificName;
        darwinCore.acceptedNameUsage = body.acceptedNameUsage;
        darwinCore.parentNameUsage = body.parentNameUsage;
        darwinCore.originalNameUsage = body.originalNameUsage;
        darwinCore.nameAccordingTo = body.nameAccordingTo;
        darwinCore.namePublishedIn = body.namePublishedIn;
        darwinCore.namePublishedInYear = body.namePublishedInYear;
        darwinCore.higherClassification = body.higherClassification;
        darwinCore.kingdom = body.kingdom;
        darwinCore.phylum = body.phylum;
        darwinCore._class = body._class;
        darwinCore.order = body.order;
        darwinCore.family = body.family;
        darwinCore.genus = body.genus;
        darwinCore.subgenus = body.subgenus;
        darwinCore.specificEpithet = body.specificEpithet;
        darwinCore.infraspecificEpithet = body.infraspecificEpithet;
        darwinCore.taxonRank = body.taxonRank;
        darwinCore.verbatimTaxonRank = body.verbatimTaxonRank;
        darwinCore.scientificNameAuthorship = body.scientificNameAuthorship;
        darwinCore.vernacularName = body.vernacularName;
        darwinCore.nomenclaturalCode = body.nomenclaturalCode;
        darwinCore.taxonomicStatus = body.taxonomicStatus;
        darwinCore.nomenclaturalStatus = body.nomenclaturalStatus;
        darwinCore.taxonRemarks = body.taxonRemarks;
        // MeasurementOrFact
        darwinCore.measurementID = body.measurementID;
        darwinCore.measurementType = body.measurementType;
        darwinCore.measurementValue = body.measurementValue;
        darwinCore.measurementAccuracy = body.measurementAccuracy;
        darwinCore.measurementUnit = body.measurementUnit;
        darwinCore.measurementDeterminedBy = body.measurementDeterminedBy;
        darwinCore.measurementDeterminedDate = body.measurementDeterminedDate;
        darwinCore.measurementMethod = body.measurementMethod;
        darwinCore.measurementRemarks = body.measurementRemarks;
        // ResourceRelationship
        darwinCore.resourceRelationshipID = body.resourceRelationshipID;
        darwinCore.resourceID = body.resourceID;
        darwinCore.relatedResourceID = body.relatedResourceID;
        darwinCore.relationshipOfResource = body.relationshipOfResource;
        darwinCore.relationshipAccordingTo = body.relationshipAccordingTo;
        darwinCore.relationshipEstablishedDate = body.relationshipEstablishedDate;
        darwinCore.relationshipRemarks = body.relationshipRemarks;
        // Fotografía
        darwinCore.fotografia = body.fotografia;

        darwinCore.save((err, darwinCoreGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el registro de DarwinCore',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                darwinCore: darwinCoreGuardado
            });
        });
    });
});


// ===============================================================
// Crear un registro de DarwinCore
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var darwinCore = new DarwinCore({
        registro: body.registro,
        // Record-level
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
        dynamicProperties: body.dynamicProperties,
        // Occurrence
        occurrenceID: body.occurrenceID,
        catalogNumber: body.catalogNumber,
        recordNumber: body.recordNumber,
        recordedBy: body.recordedBy,
        individualCount: body.individualCount,
        organismQuantity: body.organismQuantity,
        organismQuantityType: body.organismQuantityType,
        sex: body.sex,
        lifeStage: body.lifeStage,
        reproductiveCondition: body.reproductiveCondition,
        behavior: body.behavior,
        establishmentMeans: body.establishmentMeans,
        occurrenceStatus: body.occurrenceStatus,
        preparations: body.preparations,
        disposition: body.disposition,
        associatedMedia: body.associatedMedia,
        associatedReferences: body.associatedReferences,
        associatedSequences: body.associatedSequences,
        associatedTaxa: body.associatedTaxa,
        otherCatalogNumbers: body.otherCatalogNumbers,
        occurrenceRemarks: body.occurrenceRemarks,
        // Organism
        organismID: body.organismID,
        organismName: body.organismName,
        organismScope: body.organismScope,
        associatedOccurrences: body.associatedOccurrences,
        associatedOrganisms: body.associatedOrganisms,
        previousIdentifications: body.previousIdentifications,
        organismRemarks: body.organismRemarks,
        // MaterialSample
        materialSampleID: body.materialSampleID,
        // Event
        eventID: body.eventID,
        parentEventID: body.parentEventID,
        fieldNumber: body.fieldNumber,
        eventDate: body.eventDate,
        eventTime: body.eventTime,
        startDayOfYear: body.startDayOfYear,
        endDayOfYear: body.endDayOfYear,
        year: body.year,
        month: body.month,
        day: body.day,
        verbatimEventDate: body.verbatimEventDate,
        habitat: body.habitat,
        samplingProtocol: body.samplingProtocol,
        sampleSizeValue: body.sampleSizeValue,
        sampleSizeUnit: body.sampleSizeUnit,
        samplingEffort: body.samplingEffort,
        fieldNotes: body.fieldNotes,
        eventRemarks: body.eventRemarks,
        // Location
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
        georeferenceRemarks: body.georeferenceRemarks,
        // GeologicalContext
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
        bed: body.bed,
        // Identification
        identificationID: body.identificationID,
        identificationQualifier: body.identificationQualifier,
        typeStatus: body.typeStatus,
        identifiedBy: body.identifiedBy,
        dateIdentified: body.dateIdentified,
        identificationReferences: body.identificationReferences,
        identificationVerificationStatus: body.identificationVerificationStatus,
        identificationRemarks: body.identificationRemarks,
        // Taxon
        taxonID: body.taxonID,
        scientificNameID: body.scientificNameID,
        acceptedNameUsageID: body.acceptedNameUsageID,
        parentNameUsageID: body.parentNameUsageID,
        originalNameUsageID: body.originalNameUsageID,
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
        _class: body._class,
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
        taxonRemarks: body.taxonRemarks,
        // MeasurementOrFact
        measurementID: body.measurementID,
        measurementType: body.measurementType,
        measurementValue: body.measurementValue,
        measurementAccuracy: body.measurementAccuracy,
        measurementUnit: body.measurementUnit,
        measurementDeterminedBy: body.measurementDeterminedBy,
        measurementDeterminedDate: body.measurementDeterminedDate,
        measurementMethod: body.measurementMethod,
        measurementRemarks: body.measurementRemarks,
        // ResourceRelationship
        resourceRelationshipID: body.resourceRelationshipID,
        resourceID: body.resourceID,
        relatedResourceID: body.relatedResourceID,
        relationshipOfResource: body.relationshipOfResource,
        relationshipAccordingTo: body.relationshipAccordingTo,
        relationshipEstablishedDate: body.relationshipEstablishedDate,
        relationshipRemarks: body.relationshipRemarks,
        // Fotografía
        fotografia: body.fotografia
    });

    darwinCore.save((err, darwinCoreGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en DarwinCore',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            darwinCore: darwinCoreGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de DarwinCore
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    DarwinCore.findByIdAndRemove(id, (err, darwinCoreBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el registro de DarwinCore',
                errors: err
            });
        }

        if (!darwinCoreBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de DarwinCore con ese ID',
                errors: { message: 'No existe un registro de DarwinCore con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            darwinCore: darwinCoreBorrado
        });
    });
});


// ===============================================================
// Importar registros
// ===============================================================
app.use(fileUpload());

app.post('/importar', mdAutenticacion.verificaToken, (req, res) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Ningún archivo seleccionado',
            errors: { message: 'Ningún archivo seleccionado' }
        });
    }

    var EDFile = req.files.file;

    var fullDate = new Date();
    var day = ("0" + fullDate.getDate()).slice(-2);
    var month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
    var date = fullDate.getFullYear() + month + day + fullDate.getHours() + fullDate.getMinutes() + ".csv"
    EDFile.name = date;
    EDFile.mv(`./uploads/csv/${EDFile.name}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                errors: err
            });
        }

        var options = {
            mode: 'text',
            pythonPath: 'C:/Python27/python.exe',
            args: [`./uploads/csv/${EDFile.name}`]
        };

        PythonShell.run('./preprocesamiento/pre.py', options, (err) => {
            if (err) throw err;

            var stream = fs.createReadStream('./preprocesamiento/data.csv');
            var csvData = [];
            var csvStream = fastcsv
                .parse()
                .on("data", (data) => {
                    csvData.push({
                        registro: data[0],
                        type: data[1],
                        modified: data[2],
                        language: data[3],
                        license: data[4],
                        rightsHolder: data[5],
                        accessRights: data[6],
                        bibliographicCitation: data[7],
                        references: data[8],
                        institutionID: data[9],
                        collectionID: data[10],
                        datasetID: data[11],
                        institutionCode: data[12],
                        collectionCode: data[13],
                        datasetName: data[14],
                        ownerInstitutionCode: data[15],
                        basisOfRecord: data[16],
                        informationWithheld: data[17],
                        dataGeneralizations: data[18],
                        dynamicProperties: data[19],
                        // Occurrence
                        occurrenceID: data[20],
                        catalogNumber: data[21],
                        recordNumber: data[22],
                        recordedBy: data[23],
                        individualCount: data[24],
                        organismQuantity: data[25],
                        organismQuantityType: data[26],
                        sex: data[27],
                        lifeStage: data[28],
                        reproductiveCondition: data[29],
                        behavior: data[30],
                        establishmentMeans: data[31],
                        occurrenceStatus: data[32],
                        preparations: data[33],
                        disposition: data[34],
                        associatedMedia: data[35],
                        associatedReferences: data[36],
                        associatedSequences: data[37],
                        associatedTaxa: data[38],
                        otherCatalogNumbers: data[39],
                        occurrenceRemarks: data[40],
                        // Organism
                        organismID: data[41],
                        organismName: data[42],
                        organismScope: data[43],
                        associatedOccurrences: data[44],
                        associatedOrganisms: data[45],
                        previousIdentifications: data[46],
                        organismRemarks: data[47],
                        // MaterialSample
                        materialSampleID: data[48],
                        // Event
                        eventID: data[49],
                        parentEventID: data[50],
                        fieldNumber: data[51],
                        eventDate: data[52],
                        eventTime: data[53],
                        startDayOfYear: data[54],
                        endDayOfYear: data[55],
                        year: data[56],
                        month: data[57],
                        day: data[58],
                        verbatimEventDate: data[59],
                        habitat: data[60],
                        samplingProtocol: data[61],
                        sampleSizeValue: data[62],
                        sampleSizeUnit: data[63],
                        samplingEffort: data[64],
                        fieldNotes: data[65],
                        eventRemarks: data[66],
                        // Location
                        locationID: data[67],
                        higherGeographyID: data[68],
                        higherGeography: data[69],
                        continent: data[70],
                        waterBody: data[71],
                        islandGroup: data[72],
                        island: data[73],
                        country: data[74],
                        countryCode: data[75],
                        stateProvince: data[76],
                        county: data[77],
                        municipality: data[78],
                        locality: data[79],
                        verbatimLocality: data[80],
                        minimumElevationInMeters: data[81],
                        maximumElevationInMeters: data[82],
                        verbatimElevation: data[83],
                        minimumDepthInMeters: data[84],
                        maximumDepthInMeters: data[85],
                        verbatimDepth: data[86],
                        minimumDistanceAboveSurfaceInMeters: data[87],
                        maximumDistanceAboveSurfaceInMeters: data[88],
                        locationAccordingTo: data[89],
                        locationRemarks: data[90],
                        decimalLatitude: data[91],
                        decimalLongitude: data[92],
                        geodeticDatum: data[93],
                        coordinateUncertaintyInMeters: data[94],
                        coordinatePrecision: data[95],
                        pointRadiusSpatialFit: data[96],
                        verbatimCoordinates: data[97],
                        verbatimLatitude: data[98],
                        verbatimLongitude: data[99],
                        verbatimCoordinateSystem: data[100],
                        verbatimSRS: data[101],
                        footprintWKT: data[102],
                        footprintSRS: data[103],
                        footprintSpatialFit: data[104],
                        georeferencedBy: data[105],
                        georeferencedDate: data[106],
                        georeferenceProtocol: data[107],
                        georeferenceSources: data[108],
                        georeferenceVerificationStatus: data[109],
                        georeferenceRemarks: data[110],
                        // GeologicalContext
                        geologicalContextID: data[111],
                        earliestEonOrLowestEonothem: data[112],
                        latestEonOrHighestEonothem: data[113],
                        earliestEraOrLowestErathem: data[114],
                        latestEraOrHighestErathem: data[115],
                        earliestPeriodOrLowestSystem: data[116],
                        latestPeriodOrHighestSystem: data[117],
                        earliestEpochOrLowestSeries: data[118],
                        latestEpochOrHighestSeries: data[119],
                        earliestAgeOrLowestStage: data[120],
                        latestAgeOrHighestStage: data[121],
                        lowestBiostratigraphicZone: data[122],
                        highestBiostratigraphicZone: data[123],
                        lithostratigraphicTerms: data[124],
                        group: data[125],
                        formation: data[126],
                        member: data[127],
                        bed: data[128],
                        // Identification
                        identificationID: data[129],
                        identificationQualifier: data[130],
                        typeStatus: data[131],
                        identifiedBy: data[132],
                        dateIdentified: data[133],
                        identificationReferences: data[134],
                        identificationVerificationStatus: data[135],
                        identificationRemarks: data[136],
                        // Taxon
                        taxonID: data[137],
                        scientificNameID: data[138],
                        acceptedNameUsageID: data[139],
                        parentNameUsageID: data[140],
                        originalNameUsageID: data[141],
                        nameAccordingToID: data[142],
                        namePublishedInID: data[143],
                        taxonConceptID: data[144],
                        scientificName: data[145],
                        acceptedNameUsage: data[146],
                        parentNameUsage: data[147],
                        originalNameUsage: data[148],
                        nameAccordingTo: data[149],
                        namePublishedIn: data[150],
                        namePublishedInYear: data[151],
                        higherClassification: data[152],
                        kingdom: data[153],
                        phylum: data[154],
                        _class: data[155],
                        order: data[156],
                        family: data[157],
                        genus: data[158],
                        subgenus: data[159],
                        specificEpithet: data[160],
                        infraspecificEpithet: data[161],
                        taxonRank: data[162],
                        verbatimTaxonRank: data[163],
                        scientificNameAuthorship: data[164],
                        vernacularName: data[165],
                        nomenclaturalCode: data[166],
                        taxonomicStatus: data[167],
                        nomenclaturalStatus: data[168],
                        taxonRemarks: data[169],
                        // MeasurementOrFact
                        measurementID: data[170],
                        measurementType: data[171],
                        measurementValue: data[172],
                        measurementAccuracy: data[173],
                        measurementUnit: data[174],
                        measurementDeterminedBy: data[175],
                        measurementDeterminedDate: data[176],
                        measurementMethod: data[177],
                        measurementRemarks: data[178],
                        // ResourceRelationship
                        resourceRelationshipID: data[179],
                        resourceID: data[180],
                        relatedResourceID: data[181],
                        relationshipOfResource: data[182],
                        relationshipAccordingTo: data[183],
                        relationshipEstablishedDate: data[184],
                        relationshipRemarks: data[185]
                    });
                })
                .on("end", () => {
                    csvData.shift();

                    DarwinCore.insertMany(csvData, (err) => {
                        if (err) throw err;

                        res.status(200).json({
                            ok: true,
                            mensaje: 'Registros importados correctamente'
                        });
                    });
                });
            stream.pipe(csvStream);
        });
    });
});


// ===============================================================
// Exportar Vista Simplificada
// ===============================================================
app.get('/exportar/simple/:formato', mdAutenticacion.verificaToken, (req, res) => {
    var formato = req.params.formato;
    var separador = '';

    switch (formato) {
        case 'csv':
            var ws = fs.createWriteStream('./uploads/exportaciones/HerbarioTULV-Simplificado.csv');
            separador = ',';
            break;

        case 'tsv':
            separador = '\t';
            var ws = fs.createWriteStream('./uploads/exportaciones/HerbarioTULV-Simplificado.txt');
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: '',
                error: { message: 'Formato no válido' }
            });
    }

    var csvStream = format({ delimiter: separador, headers: ['#', 'Nombre', 'Número de Catálogo', 'Colector(es)', 'Reino', 'Phylum', 'Clase', 'Orden', 'Familia', 'Género', 'País', 'Departamento', 'Municipio', 'Localidad', 'Latitud', 'Longitud'] });

    DarwinCore.find((err, darwinCores) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando los registros de DarwinCore',
                errors: err
            });
        }

        csvStream.pipe(ws)
            .on('end', () => process.exit());

        darwinCores.forEach(doc => {
            csvStream.write([doc.registro, doc.scientificName, doc.catalogNumber, doc.recordedBy, doc.kingdom, doc.phylum, doc._class, doc.order, doc.family, doc.genus, doc.country, doc.stateProvince, doc.county, doc.locality, doc.verbatimLatitude, doc.verbatimLongitude]);
        });

        res.status(200).json({
            ok: true,
            mensaje: 'Archivo exportado'
        });
    });
});


// ===============================================================
// Exportar Vista Completa
// ===============================================================
app.get('/exportar/completo/:formato', mdAutenticacion.verificaToken, (req, res) => {
    var formato = req.params.formato;
    var separador = '';

    switch (formato) {
        case 'csv':
            var ws = fs.createWriteStream('./uploads/exportaciones/HerbarioTULV.csv');
            separador = ',';
            break;

        case 'tsv':
            separador = '\t';
            var ws = fs.createWriteStream('./uploads/exportaciones/HerbarioTULV.txt');
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: '',
                error: { message: 'Formato no válido' }
            });
    }

    var csvStream = format({
        delimiter: separador,
        headers: [
            // Record-Level
            'registro',
            'type',
            'modified',
            'language',
            'license',
            'rightsHolder',
            'accessRights',
            'bibliographicCitation',
            'references',
            'institutionID',
            'collectionID',
            'datasetID',
            'institutionCode',
            'collectionCode',
            'datasetName',
            'ownerInstitutionCode',
            'basisOfRecord',
            'informationWithheld',
            'dataGeneralizations',
            'dynamicProperties',
            // Occurrence
            'occurrenceID',
            'catalogNumber',
            'recordNumber',
            'recordedBy',
            'individualCount',
            'organismQuantity',
            'organismQuantityType',
            'sex',
            'lifeStage',
            'reproductiveCondition',
            'behavior',
            'establishmentMeans',
            'occurrenceStatus',
            'preparations',
            'disposition',
            'associatedMedia',
            'associatedReferences',
            'associatedSequences',
            'associatedTaxa',
            'otherCatalogNumbers',
            'occurrenceRemarks',
            // Organism
            'organismID',
            'organismName',
            'organismScope',
            'associatedOccurrences',
            'associatedOrganisms',
            'previousIdentifications',
            'organismRemarks',
            // MaterialSample
            'materialSampleID',
            // Event
            'eventID',
            'parentEventID',
            'fieldNumber',
            'eventDate',
            'eventTime',
            'startDayOfYear',
            'endDayOfYear',
            'year',
            'month',
            'day',
            'verbatimEventDate',
            'habitat',
            'samplingProtocol',
            'sampleSizeValue',
            'sampleSizeUnit',
            'samplingEffort',
            'fieldNotes',
            'eventRemarks',
            // Location
            'locationID',
            'higherGeographyID',
            'higherGeography',
            'continent',
            'waterBody',
            'islandGroup',
            'island',
            'country',
            'countryCode',
            'stateProvince',
            'county',
            'municipality',
            'locality',
            'verbatimLocality',
            'minimumElevationInMeters',
            'maximumElevationInMeters',
            'verbatimElevation',
            'minimumDepthInMeters',
            'maximumDepthInMeters',
            'verbatimDepth',
            'minimumDistanceAboveSurfaceInMeters',
            'maximumDistanceAboveSurfaceInMeters',
            'locationAccordingTo',
            'locationRemarks',
            'decimalLatitude',
            'decimalLongitude',
            'geodeticDatum',
            'coordinateUncertaintyInMeters',
            'coordinatePrecision',
            'pointRadiusSpatialFit',
            'verbatimCoordinates',
            'verbatimLatitude',
            'verbatimLongitude',
            'verbatimCoordinateSystem',
            'verbatimSRS',
            'footprintWKT',
            'footprintSRS',
            'footprintSpatialFit',
            'georeferencedBy',
            'georeferencedDate',
            'georeferenceProtocol',
            'georeferenceSources',
            'georeferenceVerificationStatus',
            'georeferenceRemarks',
            // GeologicalContext
            'geologicalContextID',
            'earliestEonOrLowestEonothem',
            'latestEonOrHighestEonothem',
            'earliestEraOrLowestErathem',
            'latestEraOrHighestErathem',
            'earliestPeriodOrLowestSystem',
            'latestPeriodOrHighestSystem',
            'earliestEpochOrLowestSeries',
            'latestEpochOrHighestSeries',
            'earliestAgeOrLowestStage',
            'latestAgeOrHighestStage',
            'lowestBiostratigraphicZone',
            'highestBiostratigraphicZone',
            'lithostratigraphicTerms',
            'group',
            'formation',
            'member',
            'bed',
            // Identification
            'identificationID',
            'identificationQualifier',
            'typeStatus',
            'identifiedBy',
            'dateIdentified',
            'identificationReferences',
            'identificationVerificationStatus',
            'identificationRemarks',
            // Taxon
            'taxonID',
            'scientificNameID',
            'acceptedNameUsageID',
            'parentNameUsageID',
            'originalNameUsageID',
            'nameAccordingToID',
            'namePublishedInID',
            'taxonConceptID',
            'scientificName',
            'acceptedNameUsage',
            'parentNameUsage',
            'originalNameUsage',
            'nameAccordingTo',
            'namePublishedIn',
            'namePublishedInYear',
            'higherClassification',
            'kingdom',
            'phylum',
            'class',
            'order',
            'family',
            'genus',
            'subgenus',
            'specificEpithet',
            'infraspecificEpithet',
            'taxonRank',
            'verbatimTaxonRank',
            'scientificNameAuthorship',
            'vernacularName',
            'nomenclaturalCode',
            'taxonomicStatus',
            'nomenclaturalStatus',
            'taxonRemarks',
            // MeasurementOrFact
            'measurementID',
            'measurementType',
            'measurementValue',
            'measurementAccuracy',
            'measurementUnit',
            'measurementDeterminedBy',
            'measurementDeterminedDate',
            'measurementMethod',
            'measurementRemarks',
            // ResourceRelationship
            'resourceRelationshipID',
            'resourceID',
            'relatedResourceID',
            'relationshipOfResource',
            'relationshipAccordingTo',
            'relationshipEstablishedDate',
            'relationshipRemarks'
        ]
    });

    DarwinCore.find((err, darwinCores) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando los registros de DarwinCore',
                errors: err
            });
        }

        csvStream.pipe(ws).on('end', () => process.exit());

        darwinCores.forEach(doc => {
            csvStream.write([
                // Record-Level
                doc.registro,
                doc.type,
                doc.modified,
                doc.language,
                doc.license,
                doc.rightsHolder,
                doc.accessRights,
                doc.bibliographicCitation,
                doc.references,
                doc.institutionID,
                doc.collectionID,
                doc.datasetID,
                doc.institutionCode,
                doc.collectionCode,
                doc.datasetName,
                doc.ownerInstitutionCode,
                doc.basisOfRecord,
                doc.informationWithheld,
                doc.dataGeneralizations,
                doc.dynamicProperties,
                // Occurrence
                doc.occurrenceID,
                doc.catalogNumber,
                doc.recordNumber,
                doc.recordedBy,
                doc.individualCount,
                doc.organismQuantity,
                doc.organismQuantityType,
                doc.sex,
                doc.lifeStage,
                doc.reproductiveCondition,
                doc.behavior,
                doc.establishmentMeans,
                doc.occurrenceStatus,
                doc.preparations,
                doc.disposition,
                doc.associatedMedia,
                doc.associatedReferences,
                doc.associatedSequences,
                doc.associatedTaxa,
                doc.otherCatalogNumbers,
                doc.occurrenceRemarks,
                // Organism
                doc.organismID,
                doc.organismName,
                doc.organismScope,
                doc.associatedOccurrences,
                doc.associatedOrganisms,
                doc.previousIdentifications,
                doc.organismRemarks,
                // MaterialSample
                doc.materialSampleID,
                // Event
                doc.eventID,
                doc.parentEventID,
                doc.fieldNumber,
                doc.eventDate,
                doc.eventTime,
                doc.startDayOfYear,
                doc.endDayOfYear,
                doc.year,
                doc.month,
                doc.day,
                doc.verbatimEventDate,
                doc.habitat,
                doc.samplingProtocol,
                doc.sampleSizeValue,
                doc.sampleSizeUnit,
                doc.samplingEffort,
                doc.fieldNotes,
                doc.eventRemarks,
                // Location
                doc.locationID,
                doc.higherGeographyID,
                doc.higherGeography,
                doc.continent,
                doc.waterBody,
                doc.islandGroup,
                doc.island,
                doc.country,
                doc.countryCode,
                doc.stateProvince,
                doc.county,
                doc.municipality,
                doc.locality,
                doc.verbatimLocality,
                doc.minimumElevationInMeters,
                doc.maximumElevationInMeters,
                doc.verbatimElevation,
                doc.minimumDepthInMeters,
                doc.maximumDepthInMeters,
                doc.verbatimDepth,
                doc.minimumDistanceAboveSurfaceInMeters,
                doc.maximumDistanceAboveSurfaceInMeters,
                doc.locationAccordingTo,
                doc.locationRemarks,
                doc.decimalLatitude,
                doc.decimalLongitude,
                doc.geodeticDatum,
                doc.coordinateUncertaintyInMeters,
                doc.coordinatePrecision,
                doc.pointRadiusSpatialFit,
                doc.verbatimCoordinates,
                doc.verbatimLatitude,
                doc.verbatimLongitude,
                doc.verbatimCoordinateSystem,
                doc.verbatimSRS,
                doc.footprintWKT,
                doc.footprintSRS,
                doc.footprintSpatialFit,
                doc.georeferencedBy,
                doc.georeferencedDate,
                doc.georeferenceProtocol,
                doc.georeferenceSources,
                doc.georeferenceVerificationStatus,
                doc.georeferenceRemarks,
                // GeologicalContext
                doc.geologicalContextID,
                doc.earliestEonOrLowestEonothem,
                doc.latestEonOrHighestEonothem,
                doc.earliestEraOrLowestErathem,
                doc.latestEraOrHighestErathem,
                doc.earliestPeriodOrLowestSystem,
                doc.latestPeriodOrHighestSystem,
                doc.earliestEpochOrLowestSeries,
                doc.latestEpochOrHighestSeries,
                doc.earliestAgeOrLowestStage,
                doc.latestAgeOrHighestStage,
                doc.lowestBiostratigraphicZone,
                doc.highestBiostratigraphicZone,
                doc.lithostratigraphicTerms,
                doc.group,
                doc.formation,
                doc.member,
                doc.bed,
                // Identification
                doc.identificationID,
                doc.identificationQualifier,
                doc.typeStatus,
                doc.identifiedBy,
                doc.dateIdentified,
                doc.identificationReferences,
                doc.identificationVerificationStatus,
                doc.identificationRemarks,
                // Taxon
                doc.taxonID,
                doc.scientificNameID,
                doc.acceptedNameUsageID,
                doc.parentNameUsageID,
                doc.originalNameUsageID,
                doc.nameAccordingToID,
                doc.namePublishedInID,
                doc.taxonConceptID,
                doc.scientificName,
                doc.acceptedNameUsage,
                doc.parentNameUsage,
                doc.originalNameUsage,
                doc.nameAccordingTo,
                doc.namePublishedIn,
                doc.namePublishedInYear,
                doc.higherClassification,
                doc.kingdom,
                doc.phylum,
                doc._class,
                doc.order,
                doc.family,
                doc.genus,
                doc.subgenus,
                doc.specificEpithet,
                doc.infraspecificEpithet,
                doc.taxonRank,
                doc.verbatimTaxonRank,
                doc.scientificNameAuthorship,
                doc.vernacularName,
                doc.nomenclaturalCode,
                doc.taxonomicStatus,
                doc.nomenclaturalStatus,
                doc.taxonRemarks,
                // MeasurementOrFact
                doc.measurementID,
                doc.measurementType,
                doc.measurementValue,
                doc.measurementAccuracy,
                doc.measurementUnit,
                doc.measurementDeterminedBy,
                doc.measurementDeterminedDate,
                doc.measurementMethod,
                doc.measurementRemarks,
                // ResourceRelationship
                doc.resourceRelationshipID,
                doc.resourceID,
                doc.relatedResourceID,
                doc.relationshipOfResource,
                doc.relationshipAccordingTo,
                doc.relationshipEstablishedDate,
                doc.relationshipRemarks
            ]);
        });

        res.status(200).json({
            ok: true,
            mensaje: 'Archivo exportado'
        });
    });
});


// ===============================================================
// Exportar CSV
// ===============================================================
app.get('/exportar/csv', mdAutenticacion.verificaToken, (req, res) => {
    var ws = fs.createWriteStream('./preprocesamiento/HerbarioTULV.csv');
    var csvStream = format({ delimiter: ',', headers: ['catalogNumber', 'recordedBy', 'scientificName', 'family', 'institutionCode', 'continent', 'country', 'stateProvince', 'county', 'municipality', 'locality'] });

    DarwinCore.find((err, darwinCores) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando los registros de DarwinCore',
                errors: err
            });
        }

        csvStream.pipe(ws)
            .on('end', () => process.exit());

        darwinCores.forEach(doc => {
            csvStream.write([doc.catalogNumber, doc.recordedBy, doc.scientificName, doc.family, doc.institutionCode, doc.continent, doc.country, doc.stateProvince, doc.county, doc.municipality, doc.locality]);
        });

        res.status(200).json({
            ok: true,
            mensaje: 'Archivo exportado'
        });
    });
});


// ===============================================================
// Exportar RDF/XML
// ===============================================================
app.get('/exportar/rdf', mdAutenticacion.verificaToken, (req, res) => {
    var options = {
        mode: 'text',
        pythonPath: 'C:/Python27/python.exe',
        args: [`./uploads/exportaciones/HerbarioTULV.rdf`]
    };

    PythonShell.run('./preprocesamiento/serializacion.py', options, (err) => {
        if (err) {
            res.status().json({
                ok: false,
                mensaje: 'Error al exportar el archivo',
                errors: err
            });
        };

        res.status(200).json({
            ok: true,
            mensaje: 'Archivo exportado'
        });
    });
});


module.exports = app;