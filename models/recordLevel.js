var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var recordLevelSchema = new Schema({
    type: { type: String, required: false },
    modified: { type: String, required: false },
    language: { type: String, required: false },
    license: { type: String, required: false },
    rightsHolder: { type: String, required: false },
    accessRights: { type: String, required: false },
    bibliographicCitation: { type: String, required: false },
    references: { type: String, required: false },
    institutionID: { type: String, required: false },
    collectionID: { type: String, required: false },
    datasetID: { type: String, required: false },
    institutionCode: { type: String, required: false },
    collectionCode: { type: String, required: false },
    datasetName: { type: String, required: false },
    ownerInstitutionCode: { type: String, required: false },
    basisOfRecord: { type: String, required: false },
    informationWithheld: { type: String, required: false },
    dataGeneralizations: { type: String, required: false },
    dynamicProperties: { type: String, required: false }
}, { collection: 'recordLevels' });

module.exports = mongoose.model('RecordLevel', recordLevelSchema);