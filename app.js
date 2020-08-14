// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var env = require('dotenv').config({ path: 'variables.env' });

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
var darwinCoreRoutes = require('./routes/darwinCore');
var usuarioRoutes = require('./routes/usuario');
var fotografiaRoutes = require('./routes/fotografia');
var comentarioRoutes = require('./routes/comentario');
var puntuacionRoutes = require('./routes/puntuacion');
var metadatoRoutes = require('./routes/metadato');
var loginRoutes = require('./routes/login');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');
var exportacionesRoutes = require('./routes/exportaciones');
var mailerRoutes = require('./routes/mailer');

// Conexión a la Base de Datos
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, res) => {
    if (err) throw err;
    console.log('Base de Datos: \x1b[32m%s\x1b[0m', 'online');
});

/* mongoose.connection.openUri('mongodb://localhost:27017/databioDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, res) => {
    if (err) throw err;
    console.log('Base de Datos: \x1b[32m%s\x1b[0m', 'online');
}); */

// Directorio público
app.use(express.static('public'));

// Rutas
app.use('/darwinCore', darwinCoreRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/fotografia', fotografiaRoutes);
app.use('/comentario', comentarioRoutes);
app.use('/puntuacion', puntuacionRoutes);
app.use('/metadato', metadatoRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/export', exportacionesRoutes);
app.use('/enviar', mailerRoutes);
app.use('/', appRoutes);

/* app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
}); */

// Escuchar Peticiones
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('Express Server puerto ' + port + ': \x1b[32m%s\x1b[0m', 'online');
});

/* app.listen(3000, () => {
    console.log('Express Server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
}); */