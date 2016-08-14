
/**
* extend object static properties
* @param: { Object } - destination of static properties
* @param: { Object } - at now one layer object supported
*/
module.exports = function extendPartiallyConstant ( dist, source ) {	
	for ( var key in source ) {
		Object.defineProperty( dist, key, {
			value: source[ key ],
			configurable: false,
			enumerable: true
		});
	}
	return dist;
}