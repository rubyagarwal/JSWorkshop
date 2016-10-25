/**
 * Created by ruby on 10/25/16.
 */


var fs = require('fs');

var filename = './data/people.json';

function loadFile(resolve, reject) {
    fs.readFile(filename, function (err, result) {
        if (err) {
            reject(err)
        }

        resolve(result);
    });
}

function loadRepo() {
    return new Promise(loadFile)

        .then(function (result) {
            return JSON.parse(result);
        })

        .catch(function() {
            return [];
        });
}

function writeRepo(data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filename, JSON.stringify(data), function (err, result) {
            if (err) {
                reject(err)
            }
            resolve(result);
        });
    }).then(function () {
        return data;
    });
}

module.exports = {
    loadRepo: loadRepo,
    writeRepo: writeRepo
};