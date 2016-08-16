
'use strict'

var read = require('./lib/read.js');
var Config = require('./lib/Config.js');
var MAP = {};


function mapper ( id, path ) {
	id = String( id );
	// cash
	if ( !MAP[ id ] && path ) MAP[ id ] = new Config( path );

	return MAP[ id ] || {};
}

mapper.read = read;
/**
 * S-config
 * @public
 */
module.exports = mapper;
