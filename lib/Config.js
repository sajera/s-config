
var read = require('./read.js');
var constant = require('./constant.js');

function Config ( data ) {
	// try to find a way to understand what you want create
	var path = typeof data === 'string' ? data : null;
	var object = typeof data === 'object' ? data : null;

	if ( !path && !object ) {

		if ( typeof window == 'undefined' )
			console.log('\x1B[0m\x1B[31m\x1B[44mS-CONFIG:\x1B[49m\n impossible to read the configuration\x1B[31m\x1B[0m:');
		else {
			console.log('%cS-CONFIG%c:\n impossible to read the configuration%c:', 'color: red; background: blue;', 'color: red; background: inherit;', '');
		}
		console.error( data );

	} else if ( path ) {

		constant( this, read( path, { DEBUG: true } ) );

	} else if ( object ) {

		for ( var key in object ) {

			// a dot in the string suggests that this is the path to the file
			if ( typeof object[ key ] == 'string' && /(\.)/g.test( object[ key ] ) ) {
				// try read file
				var oneFail = read( object[ key ], { DEBUG: true });

				if ( oneFail ) { // terminate iteration
					constant( this, { [ key ]: oneFail } );
					continue;
				}
			}
			// add one constant propertyes
			constant( this, { [ key ]: object[ key ] } );
		}
	}
};

/**
* @privat
* @constructor
* @param: { String || Object } - specification to build constant config
*/
module.exports = Config;