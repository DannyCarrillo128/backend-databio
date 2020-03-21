var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var metadatoSchema = new Schema({
    campo: { type: String, required: false },
    nombre: { type: String, required: false },
    visible: { type: Boolean, required: false, default: true }
});

module.exports = mongoose.model('Metadato', metadatoSchema);