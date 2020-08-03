var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var puntuacionSchema = new Schema({
    comentario: { type: mongoose.Schema.ObjectId, ref: 'Comentario' },
    calificacion: { type: Number, required: false },
    calificador: { type: mongoose.Schema.ObjectId, ref: 'Usuario' }
}, { collection: 'puntuaciones' });

module.exports = mongoose.model('Puntuacion', puntuacionSchema);