var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FotografiaSchema = new Schema({
    camara: { type: String, required: false },
    distanciaFocal: { type: String, required: false },
    tiempoDeExposicion: { type: String, required: false },
    iso: { type: String, required: false },
    flash: { type: String, required: false },
    comentarios: [{ type: mongoose.Schema.ObjectId, ref: 'Comentario' }]
});

module.exports = mongoose.model('Fotografia', FotografiaSchema);