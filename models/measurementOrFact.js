var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var measurementOrFactSchema = new Schema({
    measurementID: { type: String, required: false },
    measurementType: { type: String, required: false },
    measurementValue: { type: String, required: false },
    measurementAccuracy: { type: String, required: false },
    measurementUnit: { type: String, required: false },
    measurementDeterminedBy: { type: String, required: false },
    measurementDeterminedDate: { type: String, required: false },
    measurementMethod: { type: String, required: false },
    measurementRemarks: { type: String, required: false }
}, { collection: 'measurementOrFacts' });

module.exports = mongoose.model('MeasurementOrFact', measurementOrFactSchema);