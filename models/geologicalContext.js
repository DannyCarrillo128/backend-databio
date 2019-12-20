var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var geologicalContextSchema = new Schema({
    geologicalContextID: { type: String, required: false },
    earliestEonOrLowestEonothem: { type: String, required: false },
    latestEonOrHighestEonothem: { type: String, required: false },
    earliestEraOrLowestErathem: { type: String, required: false },
    latestEraOrHighestErathem: { type: String, required: false },
    earliestPeriodOrLowestSystem: { type: String, required: false },
    latestPeriodOrHighestSystem: { type: String, required: false },
    earliestEpochOrLowestSeries: { type: String, required: false },
    latestEpochOrHighestSeries: { type: String, required: false },
    earliestAgeOrLowestStage: { type: String, required: false },
    latestAgeOrHighestStage: { type: String, required: false },
    lowestBiostratigraphicZone: { type: String, required: false },
    highestBiostratigraphicZone: { type: String, required: false },
    lithostratigraphicTerms: { type: String, required: false },
    group: { type: String, required: false },
    formation: { type: String, required: false },
    member: { type: String, required: false },
    bed: { type: String, required: false }
}, { collection: 'geologicalContexts' });

module.exports = mongoose.model('GeologicalContext', geologicalContextSchema);