var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("databioDB");
    dbo.collection("recordLevels").find().sort({ registro: 1 }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});