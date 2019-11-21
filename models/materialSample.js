var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var materialSampleSchema = new Schema({
    materialSampleID: { type: String, required: false }
});

module.exports = mongoose.model('MaterialSample', materialSampleSchema);