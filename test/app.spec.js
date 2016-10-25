var assert = require('chai').assert;
// var assert = require('assert');

var baseModule = require('../src/getnamefromperson');


describe('Test getNameFromPerson', function () {
    it('should be a function', function () {
        assert.isFunction(baseModule.getNameFromPerson);
        // counts formal parameters
        assert.equal(baseModule.getNameFromPerson.length, 1);
    });

    it("should return name property", function () {
        assert.equal(baseModule.getNameFromPerson({name:"foo"}), "foo");
    });

    it("should return name property - failure", function () {
        assert.notEqual(baseModule.getNameFromPerson({name:"foo"}), "foo1");
    });

    it("should return undefined if there is no name", function () {
        assert.isUndefined(baseModule.getNameFromPerson({}));
    });

    it("should return undefined if there is no name", function () {
        assert.isUndefined(baseModule.getNameFromPerson({Name:"foo"}));
    });

    it("should throw when called without arguments", function () {
        assert.throws(function (){
            baseModule.getNameFromPerson();
        });
    });

    it('should contain alphabets only', function () {
        var name = baseModule.getNameFromPerson({"name":"foo"});
        for (var i =0; i < name.length; i++) {
            var char = name.charAt(i);
            assert.match(char, /[a-zA-Z]/);
        }
    });

    it('return one',function () {
        assert.equal(baseModule.returnOne(), 1);
    });

});

describe('Test returnOne', function () {
    it('return one',function () {
        assert.equal(baseModule.returnOne(), 1);
    });
});

