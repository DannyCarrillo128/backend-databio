var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var resourceRelationshipSchema = new Schema({
    resourceRelationshipID: { type: String, required: false },
    resourceID: { type: String, required: false },
    relatedResourceID: { type: String, required: false },
    relationshipOfResource: { type: String, required: false },
    relationshipAccordingTo: { type: String, required: false },
    relationshipEstablishedDate: { type: String, required: false },
    relationshipRemarks: { type: String, required: false }
}, { collection: 'resourceRelationships' });

module.exports = mongoose.model('ResourceRelationship', resourceRelationshipSchema);