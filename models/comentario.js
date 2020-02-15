var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var comentarioSchema = new Schema({
    texto: { type: String, required: true },
    autor: { type: mongoose.Schema.ObjectId, ref: 'Usuario' },
    fecha: { type: String, required: false },
    puntuacion: { type: String, required: false }
});

module.exports = mongoose.model('Cometario', comentarioSchema);