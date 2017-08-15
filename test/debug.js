
var picker = require('./../s-config.js');

window&&(window.picker = picker);

debugger
var assert = require('assert');
console.log('ENV', picker.read('./test/test.env'));
console.log('JSON', picker.read('./test/test.json'));

// simple
var config = picker('config-id', './test/test.json');

// complex
var config2 = picker('config-id-2', './test/test.json', {some: 'test2'}, './test/test.env');
config2 = picker.extend('config-id-2','./test/test.json', {some: 'test3'}, './test/test.env');


assert.notStrictEqual(1, '1', '\nCompletely fail ...');
// it isn't the same object, but it equal of origin
assert.notStrictEqual(config, require('./../s-config.js')('config-id'), '\nCompletely fail ...');
assert.notStrictEqual(config2, require('./../s-config.js')('config-id-2'), '\nCompletely fail ...');


console.log( 'Completely usability victory !!!' );
