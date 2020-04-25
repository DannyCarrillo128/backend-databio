var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var comentarioSchema = new Schema({
    texto: { type: String, required: true },
    autor: { type: mongoose.Schema.ObjectId, ref: 'Usuario' },
    fecha: { type: String, required: false },
    puntuacion: { type: Number, required: false, default: 0 }
});

module.exports = mongoose.model('Comentario', comentarioSchema);