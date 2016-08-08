/**
* parser for file config
*
*/

module.exports = {

	// It looks easy...
	JSON: function ( source ) {
		return JSON.parse( source );
	},

	// parser dotnev configs
	ENV: function ( sourse ) {
		var res = {},
			field, value, key = 0,
			list = sourse.toString().split('\n');

		for ( ; key < list.length; key ++ ) {
			field = list[ key ].match(/^\s*([\w\.\-\$\@\#\*\!\~]+)\s*=+/)[1];
			value = list[ key ].match(/=\s*(.*)\s*$/)[1].trim();
			if ( field ) res[ field ] = value.replace(/(^['"]|['"]$)/g, '').replace(/\s+/,' ');
		}
		return res;
	}
}