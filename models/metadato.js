var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var metadatoSchema = new Schema({
    campo: { type: String, required: false },
    nombre: { type: String, required: false },
    visible: { type: Boolean, required: false, default: true }
});

module.exports = mongoose.model('Metadato', metadatoSchema);