var assert = require('chai').assert;

var sinon = require('sinon');

var testee = require('../src/people-repo');

var fs = require('fs');

var sandbox = sinon.sandbox.create();

describe('PeopleRepository', function() {

    afterEach(function() {
        sandbox.restore();
    });

    describe('#loadRepo', function() {
        it('should resolve with an array', function(done) {
            testee.loadRepo().then(function(people) {
                assert.isArray(people);
            }).then(done, done);
        });

        it('should resolve with an array when called with an argument', function() {

            function assertValues(people) {
                assert.isArray(people);
            }

            return testee.loadRepo(true).then(assertValues);
        });

        it('should return the deserialized JSON from the file', function() {

            sandbox.stub(fs, 'readFile', function(file, callback) {
                callback(null, JSON.stringify([{name: 'peter'}]));
            });

            function verifyResults(people) {
                assert.isArray(people);
                assert.isEmpty(people);
                assert.equal(people[0].name, 'peter');
            }

            return testee.loadRepo().then(verifyResults);
        });

        it('should fail while parsing JSON and return empty array', function() {

            sandbox.stub(fs, 'readFile', function(file, callback) {
                callback(null, JSON.stringify([""]));
            });

            function verifyResults(people) {
                assert.isArray(people);
                assert.equal(people[0].name, 'peter');
            }

            return testee.loadRepo().then(verifyResults);
        });

    });


    describe('#writeRepo', function() {
        it('needs to be tested');
    });



});