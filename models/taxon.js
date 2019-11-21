var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var taxonSchema = new Schema({
    taxonID: { type: String, required: false },
    scientificNameID: { type: String, required: false },
    acceptedNameUsageID: { type: String, required: false },
    parentNameUsageID: { type: String, required: false },
    originalNameUsageIDProperty: { type: String, required: false },
    nameAccordingToID: { type: String, required: false },
    namePublishedInID: { type: String, required: false },
    taxonConceptID: { type: String, required: false },
    scientificName: { type: String, required: false },
    acceptedNameUsage: { type: String, required: false },
    parentNameUsage: { type: String, required: false },
    originalNameUsage: { type: String, required: false },
    nameAccordingTo: { type: String, required: false },
    namePublishedIn: { type: String, required: false },
    namePublishedInYear: { type: String, required: false },
    higherClassification: { type: String, required: false },
    kingdom: { type: String, required: false },
    phylum: { type: String, required: false },
    class: { type: String, required: false },
    order: { type: String, required: false },
    family: { type: String, required: false },
    genus: { type: String, required: false },
    subgenus: { type: String, required: false },
    specificEpithet: { type: String, required: false },
    infraspecificEpithet: { type: String, required: false },
    taxonRank: { type: String, required: false },
    verbatimTaxonRank: { type: String, required: false },
    scientificNameAuthorship: { type: String, required: false },
    vernacularName: { type: String, required: false },
    nomenclaturalCode: { type: String, required: false },
    taxonomicStatus: { type: String, required: false },
    nomenclaturalStatus: { type: String, required: false },
    taxonRemarks: { type: String, required: false }
});

module.exports = mongoose.model('Taxon', taxonSchema);