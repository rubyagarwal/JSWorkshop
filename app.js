/**
 * Created by ruby on 10/24/16.
 */


var express = require('express');
var bodyParser = require('body-parser');
var peopleRepo = require('./src/people-repository');


var app = express();
var name;
var name_arr = [];
var people = [];

app.use(bodyParser.json());


var baseModule = require('./src/getnamefromperson');

app.get('/', function(req, res) {
    if (people.length) {
        res.send("Hello " + people.map(baseModule.getNameFromPerson).join(', '));
    } else {
        res.send('Hello World!')
    }
});

// http://localhost:3000?name=ruby
app.post('/', function (req, res) {
    //name = req.query.name;
    name = req.param('name');
    res.sendStatus(201);
});

// :name - any string here
// http://localhost:3000/name/ruby
app.post('/name/:name', function (req, res) {
    name = req.params.name;
    res.sendStatus(201);
});

// http://localhost:3000/person
// set content-type, use body for params
app.post('/person', function (req, res) {
    var person = req.body;
    people.push(person);
    peopleRepo.writeRepo(people, function () {
        console.log("written to repo");
    });
    res.sendStatus(201);
});

app.post('/names', function (req, res) {
    name_arr.push(req.param('name'));
    res.sendStatus(201);
});

app.listen(3000, function () {
    peopleRepo.loadRepo(function(data){
        people = data;
    });
    console.log(people);
    console.log('Example app listening on port 3000!');
});