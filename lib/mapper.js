var path = require('path');
var fs = require('fs');
/**
 * @description
    
    Make a map of configs. s-config can read and store configurations constants.
    To read a file or object and set it in a constant, pass the name (id) of the constant to the 'picker'( require('s-config') )
    and the arguments to the list of objects or paths to the files.
    After thath, you can get the constant in any part of app from 'picker'( require('s-config') ) by constant name(id)

 * @example 
    // set constant from file
    var config = require('s-config')('config-id', './path/to/source/config.json');

    // set constant after reading and merge data of files and objects
    var config = require('s-config')('config-id-2', './test.json', {some: 'test2'}, './test.env');

 * @param { String } id - id of config for store or getting
 * @param { String|Object } data - data or config source path
 * @param { String|Object } data - data or config source path etc.
 * 
 * @returns { Object }
 * @function picker
 * @public
 */
function mapper ( id ) {
    id = String( id );

    // cash
    if ( !this[id] )
        return extendConfig.apply(null, Array.prototype.slice.call(arguments) );

    return Object.assign({}, this[id]);
}
var MAP = {};
var mapper = mapper.bind(MAP);

/**
 * @description

    S-config assumes that the variable is a constant.
    In this connection, it blocks the ability to rewrite its value after installation.
    If you need to partially change or expand the constant, use the extension method

 * @example 
    // set constant from file
    var config = require('s-config')('config-id', './path/to/source/config.json');
    // extend or overide existing constatnt
    var extendet = require('s-config').extend('config-id', './test.json', {some: 'test2'}, './test.env');

 *
 * @param { String } id - id of config for store or getting
 * @param { String|Object } data - data or config source path
 * @param { String|Object } data - data or config source path etc.
 * @returns { Object }
 * @function extend
 * @public
 */
mapper['extend'] = extendConfig;
function extendConfig ( id ) {

    MAP[id] = mergeConfig.apply(null, Array.prototype.slice.call(arguments, 1) );

    return Object.assign({}, MAP[id]);
}