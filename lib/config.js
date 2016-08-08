var FS = require('fs');
var parse = require('./parse.js');
var init = null;

/**
* Module exports
* @publick
*/
module.exports = {

	/**
	* get method
	*
	* @param: { String } - field name
	* @returns: { Object|| propValue } - always actual
	*/
	get: function ( field ) {
		if ( init ) {
			for ( var key in init ) this[ key ] = init[ key ];
			if ( field ) return init[ field ];
			else return init;
		} else return {};
	},

	/**
	* parse and record config
	* constant to inject any part app or api (HASH Singlton)
	* @param: { sourse path }
	* @returns: { Object } -- config || null;
	*/
	load: function ( options ) {
		if ( init = this.read( options ) ) {
			for ( var key in init ) this[ key ] = init[ key ];
			this.load = function () {
				for ( var key in init ) this[ key ] = init[ key ];
				return this;
			};
			return this;
		} else return this;
	},

	/**
	* parse config
	* read and returns any type configs
	* @param: { sourse path }
	* @returns: { Object } -- config || null;
	*/
	read: function ( options ) {
		var path = options.path || './*.*',
			encoding = options.encoding || 'utf8',
			debug = !!options.debug,
			config;
		try {
			config = FS.readFileSync( path, encoding);
			switch ( path.match(/\.([\w,-]+)$/)[1].toLowerCase() ) {
				// parsers which can be used
				case 'env': config = parse.ENV( config ); break;
				case 'json': config = parse.JSON( config ); break;

				default: throw new Error('invalid file extension');
			}
		} catch ( err ) { config = null; debug&&console.error( err ); };
		return config;
	},
};