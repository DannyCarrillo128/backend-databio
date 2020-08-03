var express = require('express');

var app = express();

const path = require('path');
const fs = require('fs');

app.get('/:tipo', (req, res, next) => {
    var tipo = req.params.tipo;

    var pathArchivo = path.resolve(__dirname, `../uploads/exportaciones/${tipo}`);

    if (fs.existsSync(pathArchivo)) {
        res.download(pathArchivo);
    } else {
        res.status(500).json({
            ok: false,
            mensaje: 'No se encontraron archivos'
        });
    }
});

module.exports = app;