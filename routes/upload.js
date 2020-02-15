var express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');

var app = express();

var Usuario = require('../models/usuario');
var DarwinCore = require('../models/darwinCore');

// default options
app.use(fileUpload());

app.put('/:tipo/:id', (req, res, next) => {
    var tipo = req.params.tipo;
    var id = req.params.id;

    var tiposValidos = ['usuarios', 'darwinCores'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El tipo ingresado no es válido',
            errors: { message: 'Los tipos válidos son ' + tiposValidos.join(', ') }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Ningún archivo seleccionado',
            errors: { message: 'Ningún archivo seleccionado' }
        });
    }

    // Obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreSeparado = archivo.name.split('.');
    var extension = nombreSeparado[nombreSeparado.length - 1];

    // Extensiones válidas
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extensión no válida',
            errors: { message: 'Extensiones válidas: ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extension }`;

    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al mover el archivo',
                errors: err
            });
        }

        subirImagen(tipo, id, nombreArchivo, res);
    });
});


function subirImagen(tipo, id, nombreArchivo, res) {
    if (tipo === 'usuarios') {
        Usuario.findById(id, (err, usuario) => {
            if (!usuario) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'No existe el Usuario',
                    errors: { message: 'No existe el Usuario' }
                });
            }

            var pathViejo = './uploads/usuarios/' + usuario.img;

            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {
                usuarioActualizado.password = ':D';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imágen de Usuario actualizada',
                    usuario: usuarioActualizado
                });
            });
        });
    }

    if (tipo === 'darwinCores') {
        DarwinCore.findById(id, (err, darwinCore) => {
            if (!darwinCore) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'No existe el registro de Darwin Core',
                    errors: { message: 'No existe el registro de Darwin Core' }
                });
            }

            var pathViejo = './uploads/darwinCores/' + darwinCore.associatedMedia;

            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            darwinCore.associatedMedia = nombreArchivo;

            darwinCore.save((err, darwinCoreActualizado) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de ' + darwinCore.catalogNumber + ' actualizada',
                    darwinCore: darwinCoreActualizado
                });
            });
        });
    }
}

module.exports = app;