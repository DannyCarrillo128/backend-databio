var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var FotografiaSchema = new Schema({
    img: { type: String, required: [true, 'Es necesario seleccionar una imagen'] },
    camara: { type: String, required: false },
    distanciaFocal: { type: String, required: false },
    tiempoDeExposicion: { type: String, required: false },
    iso: { type: String, required: false },
    flash: { type: String, required: false },
    comentarios: [{ type: mongoose.Schema.ObjectId, ref: 'Comentario' }]
});

module.exports = mongoose.model('Fotografia', FotografiaSchema);