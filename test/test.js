console.log('test.js');

(window||process).config = require('./../index.js');



// sync load and read config from file
var ownConfig = config.load({
	path: './test/test.env',
	debug: true
});
for ( let key in config ) {
	if ( typeof config[ key ] != 'function' )
	console.log(
		'\nENV',
		'\nkey =>', key,
		'\nget value =>', config.get( key ),
		'\nconfig[ fieldName ] = >', config[ key ],
		'\nownConfig[ fieldName ] = >', ownConfig[ key ]
	);
}

// sync read config from file
var aditionConfig = config.read({
	path: './test/test.json',
	debug: true
});
for ( let key in aditionConfig ) {
	console.log(
		'\nJSON',
		'\nkey =>', key,
		'\nget value =>', config.get( key ),
		'\naditionConfig[ fieldName ] = >', aditionConfig[ key ]
	);
}