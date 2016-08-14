var config = require('./../index.js');
/*-------------------------------------------------
		sync read from file
---------------------------------------------------*/
console.log('sync read from files');
var envConfig = config.read('./test/test.env');
for ( var key in envConfig ) {
	console.log( key, envConfig[ key ] );
}
var jsonConfig = config.read('./test/test.json');
for ( var key in jsonConfig ) {
	console.log( key, jsonConfig[ key ] );
}

/*-------------------------------------------------
		cash for config
---------------------------------------------------*/
envConfig = config('test-env', './test/test.env' ); // set only first time for each id 
console.log('\nset to cash');
for ( var key in envConfig ) {
	console.log( key, envConfig[ key ] );
}
envConfig = require('./../index.js')('test-env');
console.log('\nget from cash');
for ( var key in envConfig ) {
	console.log( key, envConfig[ key ] );
}

// right way because id changed
jsonConfig = config('test-json', './test/test.json' );
// wrong way because cannot be re recorded
wrongJsonConfig = config('test-env', './test/test.json' ); // set only first time for each id
// properties cannot be changed
wrongJsonConfig.config = 2;
// but can be added
wrongJsonConfig.nonExistentProperty = 'i am adding from execution code';

if(
	envConfig === require('./../index.js')('test-env')
	&& jsonConfig === require('./../index.js')('test-json')
	&& jsonConfig != envConfig
	&& wrongJsonConfig == envConfig
	&& wrongJsonConfig.config == 'ENV'
	&& wrongJsonConfig.nonExistentProperty === 'i am adding from execution code'
) {
	console.log( '\nCompletely usability victory !!!' );
} else {
	console.log( '\nCompletely fail ...' );
};