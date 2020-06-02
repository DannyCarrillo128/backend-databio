var express = require('express');
var nodemailer = require("nodemailer");

var app = express();

// ===============================================================
// Enviar Solicitud de Acceso
// ===============================================================
app.post('/solicitud', (req, res) => {
    var body = req.body;
    var url = 'http://localhost:4200/#/login';

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'email',
            pass: 'password'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    transporter.sendMail({
        from: 'dannycarrillo128@gmail.com',
        to: "danny.carrillo@correounivalle.edu.co",
        subject: 'Nueva Solicitud de Acceso',
        html: `
        <div style="background-color: #f4f6f9; padding: 25px;">
            <table style="margin-left: auto; margin-right: auto;">
                <tbody>
                    <tr>
				        <td align="center"><img width="300px" src="cid:logo"></td>
			        </tr>
                    <tr>
                        <td align="center"><h1 style="font-family: Calibri;">Nueva Solicitud de Acceso</h1></td>
                    </tr>
                    <tr>
                        <td align="justify" style="padding: 0px 30px 30px;">
                            <p style="font-family: Calibri; font-size: 17px;">
                                <strong>Información</strong><br>
                                Nombre: ${ req.body.nombre }<br>
                                Email: ${ req.body.email }<br>
                                Teléfono: ${ req.body.telefono }<br>
                                Interés: ${ req.body.interes }<br>
                                Institución: ${ req.body.institucion }<br>
                                Ocupación: ${ req.body.ocupacion }<br>
                                <br>
                            </p>
                            <p style="font-family: Calibri; font-size: 17px; white-space: pre-wrap;"><strong>Solicitud de Acceso</strong><br>${ req.body.solicitud }
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center"><a style="text-decoration: none; padding: 13px 20px 13px 20px; background: #669104; font-size: 17px; font-family: Calibri; border-radius: 6px; color: white;" href="${ url }">Continuar</a></td>
                    </tr>
		        </tbody>
	        </table>
        </div>
        `,
        attachments: [{
            path: './assets/big-logo.png',
            cid: 'logo'
        }]
    });

    res.status(200).json({
        ok: true,
        mensaje: 'Email enviado exitosamente'
    });
});


// ===============================================================
// Enviar Confirmación
// ===============================================================
app.post('/confirmacion', (req, res) => {
    var body = req.body;
    var url = 'http://localhost:4200/#/login';

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'dannycarrillo128@gmail.com',
            pass: 'ochotrigramas'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    transporter.sendMail({
        from: 'dannycarrillo128@gmail.com',
        to: req.body.email,
        subject: '¡Bienvenido a Databio!',
        html: `
        <div style="background-color: #f4f6f9; padding: 25px;">
            <table style="margin-left: auto; margin-right: auto;">
                <tbody>
                    <tr>
				        <td align="center"><img width="300px" src="cid:logo"></td>
			        </tr>
                    <tr>
                        <td align="center"><h1 style="font-family: Calibri;">¡Bienvenido a Databio!</h1></td>
                    </tr>
                    <tr>
                        <td align="justify" style="padding: 0px 30px 30px;"><p style="font-family: Calibri; font-size: 17px;">Hola ${ req.body.nombre } te damos la bienvenida a Databio, una plataforma en la que podrás<br>consultar los especímenes vegetales recolectados por el Jardín Botánico Juan María Céspedes.<br><br>Gracias por crear una cuenta.</p></td>
                    </tr>
                    <tr>
                        <td align="center"><a style="text-decoration: none; padding: 13px 20px 13px 20px; background: #669104; font-size: 17px; font-family: Calibri; border-radius: 6px; color: white;" href="${ url }">Continuar</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        `,
        attachments: [{
            path: './assets/big-logo.png',
            cid: 'logo'
        }]
    });

    res.status(200).json({
        ok: true,
        mensaje: 'Email enviado exitosamente'
    });
});

module.exports = app;