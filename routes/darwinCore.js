var express = require('express');
var mongodb = require("mongodb").MongoClient;
var fastcsv = require("fast-csv");
const spawn = require('child_process').spawn;

var mdAutenticacion = require('../middlewares/autenticacion');

const multipart = require('connect-multiparty');

var app = express();

var DarwinCore = require('../models/darwinCore');

const fileUpload = require('express-fileupload');

app.use(fileUpload());

var bodyParser = require('body-parser');
var multer = require('multer');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var fs = require("fs");
var fastcsv = require("fast-csv");


var csv = require('fast-csv');

/* const multipartMiddleware = multipart({
    uploadDir: './uploads/csv'
}); */

app.post('/uploads/csv', (req, res) => {
    let EDFile = req.files.file
    if (!EDFile) {
        res.send("File was not found");
        return;
    } else {
        let fullDate = new Date();
        let day = ("0" + fullDate.getDate()).slice(-2);
        let month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
        let date = fullDate.getFullYear() + month + day + fullDate.getHours() + fullDate.getMinutes() + ".csv"
        EDFile.name = date;
        EDFile.mv(`./uploads/csv/${EDFile.name}`, err => {
            if (err) return res.status(500).send({ message: err })
            else {

                const process = spawn('python', ['./preprocesamiento/pre.py', `./uploads/csv/${EDFile.name}`])

                process.stdout.on('data', data => {
                    let url = "mongodb://localhost:27017/databioDB";
                let stream = fs.createReadStream('./preprocesamiento/data.csv');
                let csvData = [];
                let csvStream = fastcsv
                    .parse()
                    .on("data", function(data) {
                        csvData.push({
                            type: data[0],
                            modified: data[1],
                            language: data[2],
                            license: data[3],
                            rightsHolder: data[4],
                            accessRights: data[5],
                            bibliographicCitation: data[6],
                            references: data[7],
                            institutionID: data[8],
                            collectionID: data[9],
                            datasetID: data[10],
                            institutionCode: data[11],
                            collectionCode: data[12],
                            datasetName: data[13],
                            ownerInstitutionCode: data[14],
                            basisOfRecord: data[15],
                            informationWithheld: data[16],
                            dataGeneralizations: data[17],
                            dynamicProperties: data[18],
                            // Occurrence
                            occurrenceID: data[19],
                            catalogNumber: data[20],
                            recordNumber: data[21],
                            recordedBy: data[22],
                            individualCount: data[23],
                            organismQuantity: data[24],
                            organismQuantityType: data[25],
                            sex: data[26],
                            lifeStage: data[27],
                            reproductiveCondition: data[28],
                            behavior: data[29],
                            establishmentMeans: data[30],
                            occurrenceStatus: data[31],
                            preparations: data[32],
                            disposition: data[33],
                            associatedMedia: data[34],
                            associatedReferences: data[35],
                            associatedSequences: data[36],
                            associatedTaxa: data[37],
                            otherCatalogNumbers: data[38],
                            occurrenceRemarks: data[39],
                            // Organism
                            organismID: data[40],
                            organismName: data[41],
                            organismScope: data[42],
                            associatedOccurrences: data[43],
                            associatedOrganisms: data[44],
                            previousIdentifications: data[45],
                            organismRemarks: data[46],
                            // MaterialSample
                            materialSampleID: data[47],
                            // Event
                            eventID: data[48],
                            parentEventID: data[49],
                            fieldNumber: data[50],
                            eventDate: data[51],
                            eventTime: data[52],
                            startDayOfYear: data[53],
                            endDayOfYear: data[54],
                            year: data[55],
                            month: data[56],
                            day: data[57],
                            verbatimEventDate: data[58],
                            habitat: data[59],
                            samplingProtocol: data[60],
                            sampleSizeValue: data[61],
                            sampleSizeUnit: data[62],
                            samplingEffort: data[63],
                            fieldNotes: data[64],
                            eventRemarks: data[65],
                            // Location
                            locationID: data[66],
                            higherGeographyID: data[67],
                            higherGeography: data[68],
                            continent: data[69],
                            waterBody: data[70],
                            islandGroup: data[71],
                            island: data[72],
                            country: data[73],
                            countryCode: data[74],
                            stateProvince: data[75],
                            county: data[76],
                            municipality: data[77],
                            locality: data[78],
                            verbatimLocality: data[79],
                            minimumElevationInMeters: data[80],
                            maximumElevationInMeters: data[81],
                            verbatimElevation: data[82],
                            minimumDepthInMeters: data[83],
                            maximumDepthInMeters: data[84],
                            verbatimDepth: data[85],
                            minimumDistanceAboveSurfaceInMeters: data[86],
                            maximumDistanceAboveSurfaceInMeters: data[87],
                            locationAccordingTo: data[88],
                            locationRemarks: data[89],
                            decimalLatitude: data[90],
                            decimalLongitude: data[91],
                            geodeticDatum: data[92],
                            coordinateUncertaintyInMeters: data[93],
                            coordinatePrecision: data[94],
                            pointRadiusSpatialFit: data[95],
                            verbatimCoordinates: data[96],
                            verbatimLatitude: data[97],
                            verbatimLongitude: data[98],
                            verbatimCoordinateSystem: data[99],
                            verbatimSRS: data[100],
                            footprintWKT: data[101],
                            footprintSRS: data[102],
                            footprintSpatialFit: data[103],
                            georeferencedBy: data[104],
                            georeferencedDate: data[105],
                            georeferenceProtocol: data[106],
                            georeferenceSources: data[107],
                            georeferenceVerificationStatus: data[108],
                            georeferenceRemarks: data[109],
                            // GeologicalContext
                            geologicalContextID: data[110],
                            earliestEonOrLowestEonothem: data[111],
                            latestEonOrHighestEonothem: data[112],
                            earliestEraOrLowestErathem: data[113],
                            latestEraOrHighestErathem: data[114],
                            earliestPeriodOrLowestSystem: data[115],
                            latestPeriodOrHighestSystem: data[116],
                            earliestEpochOrLowestSeries: data[117],
                            latestEpochOrHighestSeries: data[118],
                            earliestAgeOrLowestStage: data[119],
                            latestAgeOrHighestStage: data[120],
                            lowestBiostratigraphicZone: data[121],
                            highestBiostratigraphicZone: data[122],
                            lithostratigraphicTerms: data[123],
                            group: data[124],
                            formation: data[125],
                            member: data[126],
                            bed: data[127],
                            // Identification
                            identificationID: data[128],
                            identificationQualifier: data[129],
                            typeStatus: data[130],
                            identifiedBy: data[131],
                            dateIdentified: data[132],
                            identificationReferences: data[133],
                            identificationVerificationStatus: data[134],
                            identificationRemarks: data[135],
                            // Taxon
                            taxonID: data[136],
                            scientificNameID: data[137],
                            acceptedNameUsageID: data[138],
                            parentNameUsageID: data[139],
                            originalNameUsageIDProperty: data[140],
                            nameAccordingToID: data[141],
                            namePublishedInID: data[142],
                            taxonConceptID: data[143],
                            scientificName: data[144],
                            acceptedNameUsage: data[145],
                            parentNameUsage: data[146],
                            originalNameUsage: data[147],
                            nameAccordingTo: data[148],
                            namePublishedIn: data[149],
                            namePublishedInYear: data[150],
                            higherClassification: data[151],
                            kingdom: data[152],
                            phylum: data[153],
                            _class: data[154],
                            order: data[155],
                            family: data[156],
                            genus: data[157],
                            subgenus: data[158],
                            specificEpithet: data[159],
                            infraspecificEpithet: data[160],
                            taxonRank: data[161],
                            verbatimTaxonRank: data[162],
                            scientificNameAuthorship: data[163],
                            vernacularName: data[164],
                            nomenclaturalCode: data[165],
                            taxonomicStatus: data[166],
                            nomenclaturalStatus: data[167],
                            taxonRemarks: data[168],
                            // MeasurementOrFact
                            measurementID: data[169],
                            measurementType: data[170],
                            measurementValue: data[171],
                            measurementAccuracy: data[172],
                            measurementUnit: data[173],
                            measurementDeterminedBy: data[174],
                            measurementDeterminedDate: data[175],
                            measurementMethod: data[176],
                            measurementRemarks: data[177],
                            // ResourceRelationship
                            resourceRelationshipID: data[178],
                            resourceID: data[179],
                            relatedResourceID: data[180],
                            relationshipOfResource: data[181],
                            relationshipAccordingTo: data[182],
                            relationshipEstablishedDate: data[183],
                            relationshipRemarks: data[184]
                        });
                    })
                    .on("end", function() {
                        // remove the first line: header
                        csvData.shift();

                        console.log(csvData);

                        mongodb.connect(
                            url, { useNewUrlParser: true, useUnifiedTopology: true },
                            (err, client) => {
                                if (err) throw err;

                                client
                                    .db("databioDB")
                                    .collection("darwinCores")
                                    .insertMany(csvData, (err, res) => {
                                        if (err) throw err;

                                        console.log(`Inserted: ${res.insertedCount} rows`);
                                        client.close();
                                    });
                            }
                        );
                    });

                stream.pipe(csvStream);
                });
                
            }




        })
    }
});

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