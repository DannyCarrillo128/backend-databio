// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var fs = require("fs");
var mongodb = require("mongodb").MongoClient;
var fastcsv = require("fast-csv");




// Inicializar Variables
var app = express();



///

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar Rutas
var appRoutes = require('./routes/app');
var darwinCoreRoutes = require('./routes/darwinCore');
var usuarioRoutes = require('./routes/usuario');
var fotografiaRoutes = require('./routes/fotografia');
var comentarioRoutes = require('./routes/comentario');
var loginRoutes = require('./routes/login');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');

// Conexión a la Base de Datos
mongoose.connection.openUri('mongodb://localhost:27017/databioDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de Datos: \x1b[32m%s\x1b[0m', 'online');
});



// Server index config
/* var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads')); */

// Rutas
app.use('/darwinCore', darwinCoreRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/fotografia', fotografiaRoutes);
app.use('/comentario', comentarioRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/', appRoutes);




// let url = "mongodb://localhost:27017/databioDB";
// let stream = fs.createReadStream("incivaPro.csv");
// let csvData = [];
// let csvStream = fastcsv
//     .parse()
//     .on("data", function(data) {
//         csvData.push({
//             type: data[0],
//             modified: data[1],
//             language: data[2],
//             license: data[3],
//             rightsHolder: data[4],
//             accessRights: data[5],
//             bibliographicCitation: data[6],
//             references: data[7],
//             institutionID: data[8],
//             collectionID: data[9],
//             datasetID: data[10],
//             institutionCode: data[11],
//             collectionCode: data[12],
//             datasetName: data[13],
//             ownerInstitutionCode: data[14],
//             basisOfRecord: data[15],
//             informationWithheld: data[16],
//             dataGeneralizations: data[17],
//             dynamicProperties: data[18],
//             // Occurrence
//             occurrenceID: data[19],
//             catalogNumber: data[20],
//             recordNumber: data[21],
//             recordedBy: data[22],
//             individualCount: data[23],
//             organismQuantity: data[24],
//             organismQuantityType: data[25],
//             sex: data[26],
//             lifeStage: data[27],
//             reproductiveCondition: data[28],
//             behavior: data[29],
//             establishmentMeans: data[30],
//             occurrenceStatus: data[31],
//             preparations: data[32],
//             disposition: data[33],
//             associatedMedia: data[34],
//             associatedReferences: data[35],
//             associatedSequences: data[36],
//             associatedTaxa: data[37],
//             otherCatalogNumbers: data[38],
//             occurrenceRemarks: data[39],
//             // Organism
//             organismID: data[40],
//             organismName: data[41],
//             organismScope: data[42],
//             associatedOccurrences: data[43],
//             associatedOrganisms: data[44],
//             previousIdentifications: data[45],
//             organismRemarks: data[46],
//             // MaterialSample
//             materialSampleID: data[47],
//             // Event
//             eventID: data[48],
//             parentEventID: data[49],
//             fieldNumber: data[50],
//             eventDate: data[51],
//             eventTime: data[52],
//             startDayOfYear: data[53],
//             endDayOfYear: data[54],
//             year: data[55],
//             month: data[56],
//             day: data[57],
//             verbatimEventDate: data[58],
//             habitat: data[59],
//             samplingProtocol: data[60],
//             sampleSizeValue: data[61],
//             sampleSizeUnit: data[62],
//             samplingEffort: data[63],
//             fieldNotes: data[64],
//             eventRemarks: data[65],
//             // Location
//             locationID: data[66],
//             higherGeographyID: data[67],
//             higherGeography: data[68],
//             continent: data[69],
//             waterBody: data[70],
//             islandGroup: data[71],
//             island: data[72],
//             country: data[73],
//             countryCode: data[74],
//             stateProvince: data[75],
//             county: data[76],
//             municipality: data[77],
//             locality: data[78],
//             verbatimLocality: data[79],
//             minimumElevationInMeters: data[80],
//             maximumElevationInMeters: data[81],
//             verbatimElevation: data[82],
//             minimumDepthInMeters: data[83],
//             maximumDepthInMeters: data[84],
//             verbatimDepth: data[85],
//             minimumDistanceAboveSurfaceInMeters: data[86],
//             maximumDistanceAboveSurfaceInMeters: data[87],
//             locationAccordingTo: data[88],
//             locationRemarks: data[89],
//             decimalLatitude: data[90],
//             decimalLongitude: data[91],
//             geodeticDatum: data[92],
//             coordinateUncertaintyInMeters: data[93],
//             coordinatePrecision: data[94],
//             pointRadiusSpatialFit: data[95],
//             verbatimCoordinates: data[96],
//             verbatimLatitude: data[97],
//             verbatimLongitude: data[98],
//             verbatimCoordinateSystem: data[99],
//             verbatimSRS: data[100],
//             footprintWKT: data[101],
//             footprintSRS: data[102],
//             footprintSpatialFit: data[103],
//             georeferencedBy: data[104],
//             georeferencedDate: data[105],
//             georeferenceProtocol: data[106],
//             georeferenceSources: data[107],
//             georeferenceVerificationStatus: data[108],
//             georeferenceRemarks: data[109],
//             // GeologicalContext
//             geologicalContextID: data[110],
//             earliestEonOrLowestEonothem: data[111],
//             latestEonOrHighestEonothem: data[112],
//             earliestEraOrLowestErathem: data[113],
//             latestEraOrHighestErathem: data[114],
//             earliestPeriodOrLowestSystem: data[115],
//             latestPeriodOrHighestSystem: data[116],
//             earliestEpochOrLowestSeries: data[117],
//             latestEpochOrHighestSeries: data[118],
//             earliestAgeOrLowestStage: data[119],
//             latestAgeOrHighestStage: data[120],
//             lowestBiostratigraphicZone: data[121],
//             highestBiostratigraphicZone: data[122],
//             lithostratigraphicTerms: data[123],
//             group: data[124],
//             formation: data[125],
//             member: data[126],
//             bed: data[127],
//             // Identification
//             identificationID: data[128],
//             identificationQualifier: data[129],
//             typeStatus: data[130],
//             identifiedBy: data[131],
//             dateIdentified: data[132],
//             identificationReferences: data[133],
//             identificationVerificationStatus: data[134],
//             identificationRemarks: data[135],
//             // Taxon
//             taxonID: data[136],
//             scientificNameID: data[137],
//             acceptedNameUsageID: data[138],
//             parentNameUsageID: data[139],
//             originalNameUsageIDProperty: data[140],
//             nameAccordingToID: data[141],
//             namePublishedInID: data[142],
//             taxonConceptID: data[143],
//             scientificName: data[144],
//             acceptedNameUsage: data[145],
//             parentNameUsage: data[146],
//             originalNameUsage: data[147],
//             nameAccordingTo: data[148],
//             namePublishedIn: data[149],
//             namePublishedInYear: data[150],
//             higherClassification: data[151],
//             kingdom: data[152],
//             phylum: data[153],
//             _class: data[154],
//             order: data[155],
//             family: data[156],
//             genus: data[157],
//             subgenus: data[158],
//             specificEpithet: data[159],
//             infraspecificEpithet: data[160],
//             taxonRank: data[161],
//             verbatimTaxonRank: data[162],
//             scientificNameAuthorship: data[163],
//             vernacularName: data[164],
//             nomenclaturalCode: data[165],
//             taxonomicStatus: data[166],
//             nomenclaturalStatus: data[167],
//             taxonRemarks: data[168],
//             // MeasurementOrFact
//             measurementID: data[169],
//             measurementType: data[170],
//             measurementValue: data[171],
//             measurementAccuracy: data[172],
//             measurementUnit: data[173],
//             measurementDeterminedBy: data[174],
//             measurementDeterminedDate: data[175],
//             measurementMethod: data[176],
//             measurementRemarks: data[177],
//             // ResourceRelationship
//             resourceRelationshipID: data[178],
//             resourceID: data[179],
//             relatedResourceID: data[180],
//             relationshipOfResource: data[181],
//             relationshipAccordingTo: data[182],
//             relationshipEstablishedDate: data[183],
//             relationshipRemarks: data[184]
//         });
//     })
//     .on("end", function() {
//         // remove the first line: header
//         csvData.shift();

//         console.log(csvData);

//         mongodb.connect(
//             url, { useNewUrlParser: true, useUnifiedTopology: true },
//             (err, client) => {
//                 if (err) throw err;

//                 client
//                     .db("databioDB")
//                     .collection("darwinCores")
//                     .insertMany(csvData, (err, res) => {
//                         if (err) throw err;

//                         console.log(`Inserted: ${res.insertedCount} rows`);
//                         client.close();
//                     });
//             }
//         );
//     });

// stream.pipe(csvStream);


// Escuchar Peticiones
app.listen(3000, () => {
    console.log('Express Server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});