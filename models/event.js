var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    eventID: { type: String, required: false },
    parentEventID: { type: String, required: false },
    fieldNumber: { type: String, required: false },
    eventDate: { type: String, required: false },
    eventTime: { type: String, required: false },
    startDayOfYear: { type: String, required: false },
    endDayOfYear: { type: String, required: false },
    year: { type: String, required: false },
    month: { type: String, required: false },
    day: { type: String, required: false },
    verbatimEventDate: { type: String, required: false },
    habitat: { type: String, required: false },
    samplingProtocol: { type: String, required: false },
    sampleSizeValue: { type: String, required: false },
    sampleSizeUnit: { type: String, required: false },
    samplingEffort: { type: String, required: false },
    fieldNotes: { type: String, required: false },
    eventRemarks: { type: String, required: false }
});

module.exports = mongoose.model('Event', eventSchema);