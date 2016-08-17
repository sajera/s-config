
'use strict'

var read = require('./lib/read.js');
var Config = require('./lib/Config.js');
var MAP = {};


function mapper ( id, path ) {
	id = String( id );
	// cash
	if ( !MAP[ id ] ) MAP[ id ] = new Config( path );

	return MAP[ id ] || {};
}

mapper.read = read;
/**
 * S-config
 * @public
 * @param: { String } - id/name of config to get it in any time
 * @param: { String|Object } - the source(s) of which will be set up configuration
 */
module.exports = mapper;
