var csv = require('fast-csv');
var moongose = require('mongoose');
var Darwin = require('./models/darwinCore');

exports.post = function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded');
    var darwinFile = req.files.file;
    var darwins = [];

    csv
        .fromString(darwinFile.data.toString(), {
            headers: false,
            ignoreEmpty: true
        })
        .on("data", function(data) {
            data['_id'] = new moongose.Types.ObjectId();

            darwins.push(data);
        }).on("end", function() {
            Darwin.create(darwins, function(err, documents) {
                if (err) throw err;
                res.send(darwins.length + 'authors have been successfully uploaded.');
            });


        });
};