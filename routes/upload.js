var express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');

var app = express();

var Usuario = require('../models/usuario');

// default options
app.use(fileUpload());

app.put('/usuarios/:id', (req, res, next) => {
    var id = req.params.id;

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

    var path = `./uploads/usuarios/${ nombreArchivo }`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al mover el archivo',
                errors: err
            });
        }

        subirImagen(id, nombreArchivo, res);
    });
});


function subirImagen(id, nombreArchivo, res) {
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

module.exports = app;