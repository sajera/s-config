/**
 * s-config    
 * MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )    
 */
(function () {'use strict';
var path = require('path');
var fs = require('fs');
/**
 * make a map of configs
 *
 * @param id: { String } - name of config
 * @params: { String|Object } - config source
 * @returns: { Object }
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
 * extend configs
 *
 * @param id: { String } - name of config
 * @params: { String|Object } - config source
 * @returns: { Object }
 */
mapper['extend'] = extendConfig;
function extendConfig ( id ) {

    MAP[id] = mergeConfig.apply(null, Array.prototype.slice.call(arguments, 1) );

    return Object.assign({}, MAP[id]);
}
/*-------------------------------------------------
    PARSERS for files
---------------------------------------------------*/
var parsers = {
    // simple json
    json: JSON.parse.bind( JSON ),
    // parse env file
    env: function ( sourse ) {
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
* sync read file 
*
* @param path: { String } - suorce path (required)
* @returns: { Object } - js object from file
*/
mapper['read'] = readFileSync;
function readFileSync ( src ) {

    var root = path.dirname(process.mainModule.filename);
    var parser = parsers[ path.extname(src).replace('.', '') ];

    if ( !parser ) throw new Error('Source path must be specified correctly, with extension(.json .env)');

    return parser( fs.readFileSync( path.join(root, src), 'utf8', 'r') );
}



/**
 * method to merge a sources of config
 * it can take path source or object or names of other configs
 *
 * @params: { Object|String } - sources of configs  
 * @returns: { Object }
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
/*-------------------------------------------------
    define the config on the platform      
---------------------------------------------------*/
if ( typeof process != 'undefined' && Object.prototype.toString.call(process) == '[object process]' ) {

    module.exports = mapper;
}

})() 