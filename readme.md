
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

var config = require('s-config')('config-id',
    './config.env',                              // minimum priority 
    './config.json',
    {some: 'hardcode'},
    './environment/db.json',
    {another: 'hardcode'}                        // maximum priority 
);

```
**Note:** Find you way to create the present huge configs and methods of management.

Read:
---------------

```javascript

var configMap = require('s-config');
// only read config without adding to config map
var config1 = configMap.read('./path/to/source/config.json');
// only read config without adding to config map
var config2 = configMap.read('./path/to/source/config.env');


// Emulation of the "dotenv" approach
// read of environment variable from '.env' and write it in process
Object.assign(process.env, require('s-config').read('.env') );
// expand of environment variable from environment file
Object.assign(process.env, require('s-config').read('./config/env/'+process.env.NODE_ENV+'.env') );

```
**Note:** The file extension is required for any method of reading config.






#### [```API documentation ```](https://github.com/sajera/s-config/blob/master/doc/API.md)

[npm-image]: https://badge.fury.io/js/s-config.svg
[npm-url]: https://npmjs.org/package/s-config
[license-image]: http://img.shields.io/npm/l/s-is.svg
[license-url]: LICENSE
