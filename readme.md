
[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]

s-config
===============
### Config from file in constant

### installation
```shell
npm i s-config --save
```

Basic usage:
---------------

```javascript

// reading synchronous operation
var config = require('s-config')('config-id', './path/to/source/config.json');

```

**Note:** Setting only first time for each id, without the possibility of further rewriting.

Constant:
---------------

```javascript

var config = require('s-config')('config-id', './path/to/source/config.json');

if ( config === require('s-config')('config-id') ) {
	console.log( 'Completely usability victory !!!' );
} else {
	console.log( 'Completely fail ...' );
};
```
**Note:** There is no need to create global variables with the configuration or transfer of property from the initiation of the file throughout the application. Emulation of constant - prevents change of field values in the configuration at runtime.

Multi-config:
--------------

```javascript

// collect configuration of different pieces
var config = require('s-config')('config-id', {
	'json': './path/to/source/config.json',
	'env': './path/to/source/config.env',
	some: 'static data',
	or: 'some dev properties',
	fun: function () {},
	bool: true,
	spec: NaN,
	num: 1
});

```
**Note:** Find you way to create the present huge configs and methods of management.

Read:
---------------

```javascript

// only read config without adding to config map
var configMap = require('s-config');

var config1 = configMap.read('./path/to/source/config.json');

var config2 = configMap.read('./path/to/source/config.env');

```
**Note:** The file extension is required for any method of reading config.


[npm-image]: https://badge.fury.io/js/s-config.svg
[npm-url]: https://npmjs.org/package/s-config
[license-image]: http://img.shields.io/npm/l/s-is.svg
[license-url]: LICENSE
