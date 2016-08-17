var FS = require('fs');
/**
* parser for file config
* to easy use
*/
var parsers = {
	// simple json
	json: JSON.parse.bind( JSON ),
	// dotenv config
	env: ENV
};
function ENV ( sourse ) {
	var res = {}, field, value, key = 0,
		lines = String( sourse ).split('\n');

	for ( ; key < lines.length; key ++ ) {
		field = lines[ key ].match(/^\s*([\w\.\-\$\@\#\*\!\~]+)\s*=+/)[1];
		value = lines[ key ].match(/=\s*(.*)\s*$/)[1].trim();
		if ( field ) res[ field ] = value.replace(/(^['"]|['"]$)/g, '').replace(/\s+/,' ');
	}
	return res;
}

/**
* sync read file 
* @param: { String } - suorce path (required)
* @param: { Object } - options
* @returns: { Object } - js object from file
*/
module.exports = function read ( path, options ) {

	var parser = path && String( path ) === path && path.match(/\.([\w,-]+)$/) &&
		parsers[ path.match(/\.([\w,-]+)$/)[1].toLowerCase() ];

	if ( !parser ) throw new Error('Source path must be specified correctly with expansion');

	try {
		return parser(
			FS.readFileSync( path, options&&options.encoding||'utf8', 'r')
		);
	} catch ( err ) {
		if ( options && options.DEBUG ) {
			if ( typeof window == 'undefined' )
				console.log('\x1B[0m\x1B[31m\x1B[44mS-CONFIG\x1B[49m:\n read error '+path+':\x1B[31m\x1B[0m');
			else
				console.log('%cS-CONFIG%c:\n read error '+path+':', 'color: red; background: blue;', 'color: red; background: inherit;');
			console.error( err ); 
		}
		return null;
	};
}