var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var identificationSchema = new Schema({
    identificationID: { type: String, required: false },
    identificationQualifier: { type: String, required: false },
    typeStatus: { type: String, required: false },
    identifiedBy: { type: String, required: false },
    dateIdentified: { type: String, required: false },
    identificationReferences: { type: String, required: false },
    identificationVerificationStatus: { type: String, required: false },
    identificationRemarks: { type: String, required: false }
});

module.exports = mongoose.model('Identification', identificationSchema);