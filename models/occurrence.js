var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var occurrenceSchema = new Schema({
    occurrenceID: { type: String, required: false },
    catalogNumber: { type: String, required: false },
    recordNumber: { type: String, required: false },
    recordedBy: { type: String, required: false },
    individualCount: { type: String, required: false },
    organismQuantity: { type: String, required: false },
    organismQuantityType: { type: String, required: false },
    sex: { type: String, required: false },
    lifeStage: { type: String, required: false },
    reproductiveCondition: { type: String, required: false },
    behavior: { type: String, required: false },
    establishmentMeans: { type: String, required: false },
    occurrenceStatus: { type: String, required: false },
    preparations: { type: String, required: false },
    disposition: { type: String, required: false },
    associatedMedia: { type: String, required: false },
    associatedReferences: { type: String, required: false },
    associatedSequences: { type: String, required: false },
    associatedTaxa: { type: String, required: false },
    otherCatalogNumbers: { type: String, required: false },
    occurrenceRemarks: { type: String, required: false }
});

module.exports = mongoose.model('Occurrence', occurrenceSchema);