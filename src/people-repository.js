/**
 * Created by ruby on 10/25/16.
 */

var fs = require('fs');

var filename = "people.json";

function loadRepo(callback) {
    fs.readFile(filename, function (err, result) {
        if(err) {
            console.log(err);
        }

        var data;
        try {
            data = JSON.parse(result);
        } catch(e) {
            console.warn(e);
            data = [];
        }

        callback(data);
    });
}

function writeRepo(people, callback) {
    console.log(people);
    fs.writeFile(filename, JSON.stringify(people), function(err, result){
        if(err) {
            console.log(err);
        }
        callback();
    });
}

module.exports = {
    loadRepo: loadRepo,
    writeRepo: writeRepo
};