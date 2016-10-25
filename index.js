/**
 * Created by ruby on 10/25/16.
 */

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var peopleRepo = require('./src/people-repo');

app.use(bodyParser.json());

var people = [];

var baseMod = require('./src/getnamefromperson');

app.get('/', function(req, res) {
    if (people.length) {
        res.send('Hello ' + people.map(baseMod.getNameFromPerson).join(', ') + '!');
    } else {
        res.send('Hello World!')
    }
});

app.post('/person', function(req, res) {
    people.push(req.body);

    peopleRepo.writeRepo(people);

    res.sendStatus(201);
});

peopleRepo.loadRepo().then(function(data) {
    people = data;

    app.listen(3000, function() {
        console.log('Server up!');

    });
});

