

// var assert = require('assert');
// console.log('ENV', picker.read('./test.env'));
// console.log('JSON', picker.read('./test.json'));

// // simple
// var config = picker('config-id', './test.json');

// // complex
// var config2 = picker('config-id-2', './test.json', {some: 'test2'}, './test.env');
// config2 = picker.extend('config-id-2', './test.json', {some: 'test3'}, './test.env');


// assert.notStrictEqual(1, '1', '\nCompletely fail ...');
// // it isn't the same object, but it equal of origin
// assert.notStrictEqual(config, require('./../config.js')('config-id'), '\nCompletely fail ...');
// assert.notStrictEqual(config2, require('./../config.js')('config-id-2'), '\nCompletely fail ...');


// console.log( 'Completely usability victory !!!' );


var picker = require('./../config.js');
// require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('TESTS', function () {

    describe('s-config methods', function () {

        it('simple data types', function () {
            assert.isString(uid(), 'must be a string');
            assert.equal(uid().length, '36', 'lenght of default base must be 36');
            assert.equal(uid().split('-').length, '5', 'default base Consists of 5 parts');
        });

        it('uid log time of creation 10 000 uids', function () {
            var key = 10*1000;
            console.time('uid case default base: 10 000');
            while (key--) uid();
            console.timeEnd('uid case default base: 10 000');
        });

        it('uid matches 10 000 uids', function () {
            var key = 10*1000;
            var storeUid = [[]];
            while ( key-- ) {
                assert.isNotTrue(
                    customMatching(uid(), storeUid),
                    'match found on '+key+' item !'
                );
            }
        });
    });

    // describe('uid("XXX-4NNN-dummy-SSS") case custom base', function () {

    //     it('simple data types', function () {
    //         assert.isString(uid('XXX-4NNN-dummy-SSS'), 'must be a string');
    //         assert.equal(uid('XXX-4NNN-dummy-SSS').length, '18', 'lenght of custom base must be 18');
    //         assert.equal(uid('XXX-4NNN-dummy-SSS').split('-').length, '4', 'custom base Consists of 4 parts');
    //     });

    //     it('uid log time of creation 10 000 uids', function () {
    //         var key = 10*1000;
    //         console.time('uid case XXX-4NNN-dummy-SSS base: 10 000');
    //         while (key--) uid('XXX-4NNN-dummy-SSS');
    //         console.timeEnd('uid case XXX-4NNN-dummy-SSS base: 10 000');
    //     });

    //     it('uid matches 10 000 uids', function () {
    //         var key = 10*1000;
    //         var storeUid = [[]];
    //         while ( key-- ) {
    //             assert.isNotTrue(
    //                 customMatching(uid('XXX-4NNN-dummy-SSS'), storeUid),
    //                 'match found on '+key+' item !'
    //             );
    //         }
    //     });
    // });

    // describe('uid.guid() default', function () {

    //     it('simple data types', function () {
    //         assert.isString(uid.guid(), 'must be a string');
    //         assert.equal(uid.guid().split('-').length, '5', 'default base Consists of 5 parts');
    //     });

    //     it('uid.guid log time of creation 10 000 guids', function () {
    //         var key = 10*1000;
    //         console.time('uid.guid case default 10 000');
    //         while (key--) uid.guid();
    //         console.timeEnd('uid.guid case default 10 000');
    //     });

    //     it('uid.guid matches 10 000 uids based on one time', function () {
    //         // iven fast match its to long for "chai"
    //         this.timeout(10*1000);
    //         var key = 10*1000;
    //         var time = new Date();
    //         var storeGuid = [[]];
    //         while ( key-- ) {
    //             assert.isNotTrue(
    //                 customMatching(uid.guid(null, null, time), storeGuid),
    //                 'match found on '+key+' item !'
    //             );
    //         }
    //     });

    // });

    // describe('uid.time()', function () {

    //     it('default simple data types', function () {
    //         assert.isString(uid.time(), 'must be a string');
    //         assert.equal(uid.time().length, '16', 'lenght of time must be 16');
    //     });

    //     it('based on July 21, 1983 01:15:00', function () {
    //         assert.equal(
    //             uid.time(new Date('July 21, 1983 01:15:00'),'_','_','_'),
    //             '1983_06_21_01_15',
    //             'parse error'
    //         );
    //     });

    // });

    // describe('uid.th()', function () {

    //     it('default simple data types', function () {
    //         assert.isString(uid.th(), 'must be a string');
    //     });

    //     it('based on July 21, 1983 01:15:00', function () {
    //         assert.equal(
    //             uid.th(new Date('July 21, 1983 01:15:00'), 2),
    //             '110001110001110001100000110101010100000',
    //             'convert error on 2 bit'
    //         );
    //         assert.equal(
    //             uid.th(new Date('July 21, 1983 01:15:00'), 4),
    //             '12032032030012222200',
    //             'convert error on 4 bit'
    //         );
    //         assert.equal(
    //             uid.th(new Date('July 21, 1983 01:15:00'), 10),
    //             '427587300000',
    //             'convert error on 10 bit'
    //         );
    //         assert.equal(
    //             uid.th(new Date('July 21, 1983 01:15:00'), 18),
    //             '22e7a704g0',
    //             'convert error on 18 bit'
    //         );
    //         assert.equal(
    //             uid.th(new Date('July 21, 1983 01:15:00'), 36),
    //             '5gfifs80',
    //             'convert error on 36 bit'
    //         );
    //     });

    // });

});
