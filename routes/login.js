var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();

var Usuario = require('../models/usuario');

// Google
var CLIENT_ID = require('../config/config').CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

var mdAutenticacion = require('../middlewares/autenticacion');


// ===============================================================
// Autenticación Normal
// ===============================================================
app.post('/', (req, res) => {
    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        }

        if (usuarioDB.estado === 'No verificado') {
            return res.status(401).json({
                ok: false,
                mensaje: 'Acceso restringido',
                errors: err
            });
        }

        usuarioDB.password = ':D';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14440 }); // Token válido por 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id,
            menu: obtenerMenu(usuarioDB.role)
        });
    });
});


// ===============================================================
// Autenticación Google
// ===============================================================
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });

    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

app.post('/google', async(req, res) => {
    var token = req.body.token;

    try {
        var googleUser = await verify(token);
    } catch (err) {
        res.status(403).json({
            ok: false,
            mensjae: 'Token de Google no válido',
            errors: { message: 'Token de Google no válido' }
        });
        return;
    }

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Usuario',
                errors: err
            });
        };

        if (usuarioDB) {
            if (!usuarioDB.google) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Se debe utilizar la autenticación normal'
                });
            }

            if (usuarioDB.estado === 'No verificado') {
                return res.status(401).json({
                    ok: false,
                    mensaje: 'Acceso restringido',
                    errors: err
                });
            } else {
                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

                return res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB._id,
                    menu: obtenerMenu(usuarioDB.role)
                });
            }
        } else {
            var usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.password = ':D';
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.estado = 'No verificado';

            return res.status(200).json({
                ok: true,
                usuario: usuario
            });
        }
    });
});


// ===============================================================
// Renovar Token
// ===============================================================
app.get('/renovarToken', mdAutenticacion.verificaToken, (req, res) => {
    var token = jwt.sign({ usuario: req.usuario }, SEED, { expiresIn: 14400 }); // 4 horas

    res.status(200).json({
        ok: true,
        token: token
    });
});


function obtenerMenu(role) {
    var menu = [{
        titulo: 'Registros',
        icono: 'mdi mdi-leaf',
        submenu: [
            { titulo: 'Darwin Core', url: '/darwinCore' },
            { titulo: 'Galería', url: '/gallery2' }
        ]
    }];

    if (role === 'ADMIN_ROLE') {
        menu[0].titulo = 'Administrador';
        menu[0].icono = 'mdi mdi-account-settings-variant';
        menu[0].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });
    }

    return menu;
}

module.exports = app;