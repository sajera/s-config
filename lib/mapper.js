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