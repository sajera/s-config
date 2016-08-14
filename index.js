
'use strict'

var read = require('./lib/read.js');
var constant = require('./lib/constant.js');
var MAP = {};

function mapper ( id, path ) {
	id = String( id );
	// cash
	if ( !MAP[ id ] && path && String( path ) == path ) {
		MAP[ id ] = constant( {}, read( path ) );
	}
	return MAP[ id ] || {};
}

mapper.read = read;
/**
 * S-config
 * @public
 */
module.exports = mapper;
