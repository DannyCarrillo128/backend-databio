// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar Variables
var app = express();

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
var recordLevelRoutes = require('./routes/recordLevel');
var occurrenceRoutes = require('./routes/occurrence');
var organismRoutes = require('./routes/organism');
var materialSampleRoutes = require('./routes/materialSample');
var eventRoutes = require('./routes/event');
var locationRoutes = require('./routes/location');
var geologicalContextRoutes = require('./routes/geologicalContext');
var identificationRoutes = require('./routes/identification');
var taxonRoutes = require('./routes/taxon');
var measurementOrFactRoutes = require('./routes/measurementOrFact');
var resourceRelationshipRoutes = require('./routes/resourceRelationship');
var usuarioRoutes = require('./routes/usuario');
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
app.use('/recordLevel', recordLevelRoutes);
app.use('/occurrence', occurrenceRoutes);
app.use('/organism', organismRoutes);
app.use('/materialSample', materialSampleRoutes);
app.use('/event', eventRoutes);
app.use('/location', locationRoutes);
app.use('/geologicalContext', geologicalContextRoutes);
app.use('/identification', identificationRoutes);
app.use('/taxon', taxonRoutes);
app.use('/measurementOrFact', measurementOrFactRoutes);
app.use('/resourceRelationship', resourceRelationshipRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/', appRoutes);

// Escuchar Peticiones
app.listen(3000, () => {
    console.log('Express Server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});