/*
 * s-config version 1.4.0 at 2017-08-15
 * @license MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )    
 */
/** @ignore */
(function () {'use strict';
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
/*-------------------------------------------------
    PARSERS for files
    parser['.env']('DB_PASS=s1mpl3')
    parser['.json']('{"DB_PASS"="s1mpl3"}')
---------------------------------------------------*/
var parser = {
    // simple json
    '.json': JSON.parse.bind( JSON ),
    // parse env file
    '.env': function ( sourse ) {
        var res = {}, field, value, key = 0, lines = String( sourse ).split('\n');
        for ( ; key < lines.length; key ++ ) {
            field = lines[ key ].match(/^\s*([\w\.\-\$\@\#\*\!\~]+)\s*=+/)[1];
            value = lines[ key ].match(/=\s*(.*)\s*$/)[1].trim();
            if ( field ) res[ field ] = value.replace(/(^['"]|['"]$)/g, '').replace(/\s+/,' ');
        }
        return res;
    }
};

/**
 * @description
    
    s-config can read .json and .env files.
    If you do not need to use constants, you can read the files without saving them inside of the s-config.
    Important - this method does not use ability to merge configuration. 

 * @example 
    // 
    require('s-config').read('./test.env');
    require('s-config').read('./test.json');

    // Emulation of the "dotenv" approach
    // read of environment variable from '.env' and write it in process
    Object.assign(process.env, require('s-config').read('.env') );
    // expand of environment variable from environment file
    Object.assign(process.env, require('s-config').read('./config/env/'+process.env.NODE_ENV+'.env') );

 *
 * @param { String } path - suorce path (extension is required)
 * @returns { Object } - js object from file
 */
mapper['read'] = readFileSync;
function readFileSync ( src ) {

    var root = path.dirname(process.mainModule.filename);
    var parse = parser[ path.extname(src) ];

    if ( !parse ) throw new Error('Source path must be specified correctly, with extension(.json .env)');

    return parse( fs.readFileSync( path.join(root, src), 'utf8', 'r') );
}



/**
 * method to merge a sources of config
 * it can take path source or object or names of other configs
 *
 * @param { Object|String } - sources of configs  
 * @returns { Object }
 * @private
 */
function mergeConfig () {
    var sources = arguments, key = 0, res = [], item;

    for ( ; key < sources.length; key ++ ) {
        item = sources[key];
        if ( typeof item == 'string' ) {
            if ( MAP[item] ) {
                res.push( MAP[item] );
            } else {
                res.push( readFileSync(item) );
            }
        } else if ( Object.prototype.toString.call(item) == '[object Object]' ) {
            res.push( item );
        } else throw new Error('Unexpected variables of config: ', item);
    }
    return Object.assign.apply(Object, res);
}
/**
 * @description
    defination on Node.js

    npm i --save s-config

 * @example var picker = require('s-config');
 *
 * @exports s-config
 * @publick
 */
if ( typeof process != 'undefined' && Object.prototype.toString.call(process) == '[object process]' ) {

    module.exports = mapper;
}

})() 