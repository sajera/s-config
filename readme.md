
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

var config = require('s-config')('config-id', './path/to/source/config.json');

```


Constant:
---------------

```javascript

var config = require('s-config')('config-id', './path/to/source/config.json');

// it isn't the same object, but it equal of origin
var assert = require('assert');
assert.notStrictEqual(config, require('s-config')('config-id'), 'Completely fail ...');

```
**Note:** Emulation of constant - prevents change of field values in the configuration at runtime.

Merge-config :
--------------

```javascript

var config = require('s-config')('config-app-id',
	'./config.env',
	'./config.json',
	{some: 'hardcode'},
	'./environment/db.json',
	{another: 'hardcode'}
);

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
