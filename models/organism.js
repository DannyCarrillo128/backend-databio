var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var organismSchema = new Schema({
    organismID: { type: String, required: false },
    organismName: { type: String, required: false },
    organismScope: { type: String, required: false },
    associatedOccurrences: { type: String, required: false },
    associatedOrganisms: { type: String, required: false },
    previousIdentifications: { type: String, required: false },
    organismRemarks: { type: String, required: false }
});

module.exports = mongoose.model('Organism', organismSchema);