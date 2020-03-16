var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

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
        //.populate('fotografia')
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


module.exports = app;