s-config
===============
### Config from file in constant

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


Read:
---------------
```javascript

// only read config without adding to config map
var configMap = require('s-config');

var config1 = configMap.read('./path/to/source/config.json');

var config2 = configMap.read('./path/to/source/config.env');

```
**Note:** File extension is required. Perhaps the development stage, you may need to view or compare different configs.

