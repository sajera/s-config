
// require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('TESTS', function () {

    var picker = require('./../s-config.js');

    describe('s-config methods', function () {

        it('picker or mapper', function () {
            assert.isFunction(picker, 'must be a function');
        });

        it('picker.extend ', function () {
            assert.isFunction(picker.extend, 'must be a function');
        });

        it('picker.read', function () {
            assert.isFunction(picker.read, 'must be a function');
        });

    });

    describe('picker or mapper behavior', function () {

        it('constant by id', function () {

            assert.isNull(picker('some-id'), 'null on empty constant');
        });

        var t1 = {hardcode: true};
        it('constant from object '+ JSON.stringify(t1), function () {
            assert.isObject( picker('test-id-1', t1 ), 'existing constants always the object');
            assert.notStrictEqual(t1, picker('test-id-1', t1), 'on call it not strict equal to origin');
            var config = picker('test-id-1', t1);
            config.hardcode = false;
            assert.notStrictEqual(t1, picker('test-id-1', t1), 'сan not be changed');
        });

        var t2 = __dirname+'/test.json'; // have properties hardcode = false
        it('constant from file path '+t2, function () {
            assert.isObject( picker('test-id-2', t2), 'existing constants always the object');
            assert.notStrictEqual(require(t2), picker('test-id-2', t2 ), 'on call it not strict equal to origin');
            var config = picker('test-id-2', t2);
            config.hardcode = true;
            assert.notStrictEqual(require(t2), picker('test-id-2', t2 ), 'сan not be changed');
        });

        var t3 = __dirname+'/test.env';
        var t3Equal = { DB_HOST:"localhost", DB_PASS:"s1mpl3", DB_USER:"root", config_e: "ENV", hardcode: "false"}
        it('constant from file path '+t3, function () {
            assert.isObject( picker('test-id-3', t3), 'existing constants always the object');
            assert.notStrictEqual(t3Equal, picker('test-id-2', t3 ), 'on call it not strict equal to origin');
            var config = picker('test-id-3', t3);
            config.hardcode = true;
            assert.notStrictEqual(t3Equal, picker('test-id-2', t3 ), 'сan not be changed');
        });

        it('constant from multi configs', function () {
            var mc = picker('test-id-4', t1, t2, t3);
            assert.isObject(mc, 'existing constants always the object');
            assert.notStrictEqual(t3Equal, picker('test-id-2', {"hardcode":"false","congfig":"JSON","DB_HOST":"localhost","DB_USER":"root","DB_PASS":"s1mpl3","config":"ENV"}), 'on call it not strict equal to origin');
        });

    });

});
