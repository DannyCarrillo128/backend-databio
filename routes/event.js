var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Event = require('../models/event');

// ===============================================================
// Obtener todos los registros de Event
// ===============================================================
app.get('/', (req, res, next) => {
    Event.find({})
        .exec((err, events) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando los registros de Event',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                events: events
            });
        });
});


// ===============================================================
// Obtener un registro de Event
// ===============================================================
app.get('/:id', (req, res) => {
    var id = req.params.id;

    Event.findById(id)
        .exec((err, event) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el registro de Event',
                    errors: err
                });
            }

            if (!event) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El registro con el ID ' + id + ' no existe',
                    errors: { message: 'No existe un registro de Event con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                event: event
            });
        });
});


// ===============================================================
// Actualizar un registro de Event
// ===============================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Event.findById(id, (err, event) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro de Event',
                errors: err
            });
        }

        if (!event) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el ID ' + id + ' no existe',
                errors: { message: 'No existe un registro de Event con ese ID' }
            });
        }

        event.eventID = body.eventID;
        event.parentEventID = body.parentEventID;
        event.fieldNumber = body.fieldNumber;
        event.eventDate = body.eventDate;
        event.eventTime = body.eventTime;
        event.startDayOfYear = body.startDayOfYear;
        event.endDayOfYear = body.endDayOfYear;
        event.year = body.year;
        event.month = body.month;
        event.day = body.day;
        event.verbatimEventDate = body.verbatimEventDate;
        event.habitat = body.habitat;
        event.samplingProtocol = body.samplingProtocol;
        event.sampleSizeValue = body.sampleSizeValue;
        event.sampleSizeUnit = body.sampleSizeUnit;
        event.samplingEffort = body.samplingEffort;
        event.fieldNotes = body.fieldNotes;
        event.eventRemarks = body.eventRemarks;

        event.save((err, eventGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el registro de Event',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                event: eventGuardado
            });
        });
    });
});


// ===============================================================
// Crear un registro de Event
// ===============================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var event = new Event({
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
        eventRemarks: body.eventRemarks
    });

    event.save((err, eventGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el registro en Event',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            event: eventGuardado
        });
    });
});


// ===============================================================
// Borrar un registro de Event
// ===============================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Event.findByIdAndRemove(id, (err, eventBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el registro de Event',
                errors: err
            });
        }

        if (!eventBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro de Event con ese ID',
                errors: { message: 'No existe un registro de Event con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            event: eventBorrado
        });
    });
});


module.exports = app;