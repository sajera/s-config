/**
 * @description
    defination on Node.js

    npm i --save s-config

 * @example var picker = require('s-config');
 *
 * @exports s-config
 * @publick
 */
if ( typeof process != 'undefined' && Object.prototype.toString.call(process) == '[object process]' ) {

    module.exports = mapper;
}
